import { Locator, expect } from '@playwright/test';

/**
 * Structural layout checks based on boundingBox() math. This is the first of
 * the three visual-testing tiers the architecture plan calls for:
 *   1. LayoutAssertions (this file) - structural, cheap, no baselines to maintain
 *   2. CSSAssertions     - computed-style compliance
 *   3. toHaveScreenshot  - full pixel regression
 */
export class LayoutAssertions {
  private static async box(locator: Locator) {
    const box = await locator.boundingBox();
    if (!box) {
      throw new Error(`Element has no bounding box (not visible/attached): ${locator}`);
    }
    return box;
  }

  /**
   * Assert that two elements share the same horizontal (left) or vertical
   * (top) edge, within a pixel tolerance.
   */
  static async assertAligned(
    a: Locator,
    b: Locator,
    axis: 'left' | 'top' = 'left',
    tolerancePx = 1
  ): Promise<void> {
    const coordinate = axis === 'left' ? 'x' : 'y';
    const [boxA, boxB] = await Promise.all([this.box(a), this.box(b)]);
    const delta = Math.abs(boxA[coordinate] - boxB[coordinate]);
    expect(delta, `Expected elements aligned on ${axis} within ${tolerancePx}px, got ${delta}px`).toBeLessThanOrEqual(
      tolerancePx
    );
  }

  /**
   * Assert that `child` is fully contained within `container`'s box.
   */
  static async assertWithinBounds(child: Locator, container: Locator): Promise<void> {
    const [childBox, containerBox] = await Promise.all([this.box(child), this.box(container)]);
    expect(childBox.x).toBeGreaterThanOrEqual(containerBox.x);
    expect(childBox.y).toBeGreaterThanOrEqual(containerBox.y);
    expect(childBox.x + childBox.width).toBeLessThanOrEqual(containerBox.x + containerBox.width);
    expect(childBox.y + childBox.height).toBeLessThanOrEqual(containerBox.y + containerBox.height);
  }

  /**
   * Assert that two elements' boxes do not overlap.
   */
  static async assertNoOverlap(a: Locator, b: Locator): Promise<void> {
    const [boxA, boxB] = await Promise.all([this.box(a), this.box(b)]);
    const overlap =
      boxA.x < boxB.x + boxB.width &&
      boxA.x + boxA.width > boxB.x &&
      boxA.y < boxB.y + boxB.height &&
      boxA.y + boxA.height > boxB.y;
    expect(overlap, 'Expected elements not to overlap').toBe(false);
  }

  /**
   * Assert that `locators` appear in the given reading order (top-to-bottom,
   * then left-to-right for ties), by comparing boundingBox() positions.
   */
  static async assertOrder(locators: Locator[]): Promise<void> {
    const boxes = await Promise.all(locators.map((l) => this.box(l)));
    for (let i = 1; i < boxes.length; i++) {
      const prev = boxes[i - 1];
      const curr = boxes[i];
      const inOrder = curr.y > prev.y || (Math.abs(curr.y - prev.y) < 2 && curr.x >= prev.x);
      expect(inOrder, `Expected element at index ${i} to follow element ${i - 1} in reading order`).toBe(true);
    }
  }
}
