#!/usr/bin/env ts-node
/**
 * Posts a one-line test-run summary to a Slack incoming webhook.
 *
 * We don't have a real webhook configured for this repo yet, so this
 * no-ops with a clear log line (not a crash) when SLACK_WEBHOOK_URL isn't
 * set, rather than fabricating a Slack/Zulip integration with invented
 * credentials. Wire a real webhook URL into CI secrets and this starts
 * posting immediately — no code change needed.
 *
 * Usage: ts-node scripts/notify.ts "<app>" "<status>" "<reportUrl>"
 *   ts-node scripts/notify.ts gmail passed https://ci.example.com/run/123
 */
async function main() {
  const [app, status, reportUrl] = process.argv.slice(2);
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!app || !status) {
    console.error('Usage: ts-node scripts/notify.ts "<app>" "<status>" ["<reportUrl>"]');
    process.exit(2);
  }

  const emoji = status === 'passed' ? '✅' : '❌';
  const text = `${emoji} *${app}* tests ${status}${reportUrl ? ` — <${reportUrl}|view report>` : ''}`;

  if (!webhookUrl) {
    console.log(`notify: SLACK_WEBHOOK_URL not set, skipping notification. Message would have been:\n${text}`);
    return;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    console.error(`notify: webhook responded with ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  console.log('notify: posted test-run summary to Slack.');
}

main().catch((error) => {
  console.error('notify: failed to post notification:', error);
  process.exit(1);
});
