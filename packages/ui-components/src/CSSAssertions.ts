import { Locator, expect } from '@playwright/test';

/**
 * Computed-style (CSS compliance) checks, the second tier of the visual
 * testing strategy. These run page.evaluate() against getComputedStyle so
 * they catch styling regressions that don't change layout geometry (e.g. the
 * wrong color token, an unintended font-size) without needing a screenshot
 * baseline.
 */
export class CSSAssertions {
  private static async computedStyle(locator: Locator): Promise<Record<string, string>> {
    return locator.evaluate((el) => {
      const style = window.getComputedStyle(el);
      const result: Record<string, string> = {};
      for (const prop of Array.from(style)) {
        result[prop] = style.getPropertyValue(prop);
      }
      return result;
    });
  }

  /**
   * Assert a single computed CSS property equals an expected value.
   */
  static async assertCssProperty(locator: Locator, property: string, expected: string): Promise<void> {
    const actual = await locator.evaluate(
      (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
      property
    );
    expect(actual.trim(), `Expected CSS "${property}" to be "${expected}"`).toBe(expected);
  }

  /**
   * Assert computed `color` or `background-color` matches an expected CSS
   * color value. Both sides are normalized to the browser's own rgb()
   * serialization by round-tripping the expected value through a throwaway
   * element, so callers can pass hex/named colors directly.
   */
  static async assertColor(
    locator: Locator,
    expected: string,
    property: 'color' | 'background-color' = 'color'
  ): Promise<void> {
    const actual = await locator.evaluate(
      (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
      property
    );
    const normalizedExpected = await locator.page().evaluate((color) => {
      const probe = document.createElement('div');
      probe.style.color = color;
      document.body.appendChild(probe);
      const resolved = window.getComputedStyle(probe).color;
      probe.remove();
      return resolved;
    }, expected);
    expect(actual.trim(), `Expected ${property} to resolve to "${expected}" (${normalizedExpected})`).toBe(
      normalizedExpected
    );
  }

  /**
   * Assert computed font-size, e.g. assertFontSize(locator, '16px').
   */
  static async assertFontSize(locator: Locator, expectedPx: string): Promise<void> {
    await this.assertCssProperty(locator, 'font-size', expectedPx);
  }
}
