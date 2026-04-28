#!/usr/bin/env node
/**
 * Lovable Daily Automation
 * Logs into lovable.dev, opens your project, submits the next queued prompt,
 * waits for the AI to finish, then exits.
 *
 * Run manually:  node lovable-auto.js
 * Or via cron:   see run-daily.sh
 */

require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const LOVABLE_EMAIL    = process.env.LOVABLE_EMAIL;
const LOVABLE_PASSWORD = process.env.LOVABLE_PASSWORD;
const PROJECT_URL      = process.env.LOVABLE_PROJECT_URL; // e.g. https://lovable.dev/projects/your-project-id
const PROMPTS_FILE     = path.join(__dirname, 'prompts.json');
const STATE_FILE       = path.join(__dirname, 'state.json');
const HEADLESS         = process.env.HEADLESS !== 'false'; // set HEADLESS=false to watch it run

// ── State helpers ────────────────────────────────────────────────────────────
function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { nextIndex: 0, completed: [] };
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function loadPrompts() {
  if (!fs.existsSync(PROMPTS_FILE)) {
    console.error('prompts.json not found. Create it with an array of prompt strings.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  // Validate env
  if (!LOVABLE_EMAIL || !LOVABLE_PASSWORD || !PROJECT_URL) {
    console.error(
      'Missing required env vars. Copy .env.example to .env and fill in:\n' +
      '  LOVABLE_EMAIL, LOVABLE_PASSWORD, LOVABLE_PROJECT_URL'
    );
    process.exit(1);
  }

  const prompts = loadPrompts();
  const state   = loadState();

  if (state.nextIndex >= prompts.length) {
    console.log('All prompts have been submitted. Website build is complete!');
    process.exit(0);
  }

  const prompt = prompts[state.nextIndex];
  console.log(`[${new Date().toISOString()}] Submitting prompt ${state.nextIndex + 1}/${prompts.length}:`);
  console.log(`  "${prompt.slice(0, 80)}${prompt.length > 80 ? '…' : ''}"`);

  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  try {
    // ── 1. Log in ─────────────────────────────────────────────────────────
    console.log('Navigating to login page…');
    await page.goto('https://lovable.dev/auth', { waitUntil: 'networkidle' });

    // Fill email/password (Lovable uses Supabase auth UI)
    await page.fill('input[type="email"]', LOVABLE_EMAIL);
    await page.fill('input[type="password"]', LOVABLE_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for redirect away from /auth
    await page.waitForURL(url => !url.toString().includes('/auth'), { timeout: 15_000 });
    console.log('Logged in successfully.');

    // ── 2. Open the project ───────────────────────────────────────────────
    console.log('Opening project…');
    await page.goto(PROJECT_URL, { waitUntil: 'networkidle', timeout: 30_000 });

    // ── 3. Find the chat/prompt input ─────────────────────────────────────
    // Lovable's editor has a textarea at the bottom of the chat panel.
    const inputSelectors = [
      'textarea[placeholder*="message" i]',
      'textarea[placeholder*="prompt" i]',
      'textarea[placeholder*="describe" i]',
      'div[contenteditable="true"]',
      'textarea',
    ];

    let inputEl = null;
    for (const sel of inputSelectors) {
      try {
        inputEl = await page.waitForSelector(sel, { timeout: 8_000 });
        if (inputEl) break;
      } catch { /* try next */ }
    }

    if (!inputEl) {
      throw new Error('Could not locate the prompt input field. Lovable UI may have changed.');
    }

    // ── 4. Submit the prompt ──────────────────────────────────────────────
    await inputEl.click();
    await inputEl.fill('');
    await inputEl.type(prompt, { delay: 30 }); // realistic typing speed

    // Press Enter or click Send button
    const sendBtn = await page.$('button[aria-label*="send" i], button[type="submit"]');
    if (sendBtn) {
      await sendBtn.click();
    } else {
      await inputEl.press('Enter');
    }
    console.log('Prompt submitted. Waiting for AI to finish…');

    // ── 5. Wait for AI to finish ──────────────────────────────────────────
    // Lovable shows a loading/generating indicator while working.
    // We wait for it to disappear (up to 5 minutes per prompt).
    const loadingSelectors = [
      '[data-state="loading"]',
      '.generating',
      '[aria-label*="generating" i]',
      '[aria-label*="thinking" i]',
      'button[disabled][aria-label*="send" i]',
    ];

    // Small initial pause to let the loading state appear
    await page.waitForTimeout(3_000);

    let finished = false;
    const deadline = Date.now() + 5 * 60 * 1000; // 5 min max

    while (!finished && Date.now() < deadline) {
      finished = true;
      for (const sel of loadingSelectors) {
        const el = await page.$(sel);
        if (el) { finished = false; break; }
      }
      if (!finished) await page.waitForTimeout(4_000);
    }

    if (!finished) {
      console.warn('Warning: Timed out waiting for AI to finish. Marking prompt as done anyway.');
    } else {
      console.log('AI finished generating.');
    }

    // ── 6. Save progress ──────────────────────────────────────────────────
    state.completed.push({
      index:     state.nextIndex,
      prompt:    prompt,
      submittedAt: new Date().toISOString(),
    });
    state.nextIndex += 1;
    saveState(state);

    const remaining = prompts.length - state.nextIndex;
    console.log(`Done. ${remaining} prompt(s) remaining in the queue.`);
    if (remaining === 0) console.log('All prompts complete — website should be finished!');

  } catch (err) {
    console.error('Automation error:', err.message);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
    console.log('Screenshot saved to error-screenshot.png for debugging.');
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
