const { chromium } = require('/home/krish/.gemini/antigravity/scratch/agentic-cinema/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = '/home/krish/.gemini/antigravity/scratch/lexispulse-ai/gallery';
const RAW_VIDEO_DIR = path.join(OUTPUT_DIR, 'raw_video');
const AUDIO_PATH = path.join(OUTPUT_DIR, 'lexispulse_ai_narration.mp3');
const FINAL_MP4 = '/home/krish/Documents/LexisPulse_Demo_Walkthrough.mp4';

// Clean old video
if (fs.existsSync(RAW_VIDEO_DIR)) {
  fs.rmSync(RAW_VIDEO_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RAW_VIDEO_DIR, { recursive: true });

(async () => {
  console.log('🚀 Starting Playwright 1080p recording for LexisPulse AI...');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: RAW_VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log('🌐 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 1. Hero Contract Preloaders
  console.log('📸 1. Interacting with Hero Preloaders...');
  await page.click('button:has-text("Silicon Valley Mutual Non-Disclosure")');
  await page.waitForTimeout(1500);
  await page.click('button:has-text("Executive Employment & IP Transfer")');
  await page.waitForTimeout(1500);
  await page.click('button:has-text("SaaS Master Services Agreement")');
  await page.waitForTimeout(1500);

  // 2. Open Live Studio
  console.log('📸 2. Opening Live Audit Studio...');
  await page.click('button:has-text("Launch Live Contract Audit")');
  await page.waitForTimeout(2500);

  // 3. Side-by-Side Redline & Accept Remediation
  console.log('📸 3. Accepting Remediations & Toggling Redlines...');
  await page.click('button:has-text("Accept Patch")');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Inline Diff")');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Side-by-Side")');
  await page.waitForTimeout(1500);

  // 4. Switch to Risk Matrix inside modal
  console.log('📸 4. Viewing 6-Vector Risk Matrix...');
  await page.click('div.fixed.inset-0 button:has-text("Risk Matrix")');
  await page.waitForTimeout(3000);

  // 5. Switch to Plain English ELI5
  console.log('📸 5. Viewing Plain English Translations...');
  await page.click('div.fixed.inset-0 button:has-text("Plain English")');
  await page.waitForTimeout(3000);

  // 6. Grounded Q&A Assistant
  console.log('📸 6. Running Grounded Q&A Query...');
  await page.click('div.fixed.inset-0 button:has-text("Grounded Q&A")');
  await page.waitForTimeout(1500);
  await page.fill('input[placeholder*="Ask live Gemini"]', 'What is our liability exposure under Section 9.2?');
  await page.waitForTimeout(800);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3500);

  // 7. Close Studio & Open API Diagnostics HUD
  console.log('📸 7. Opening API Diagnostics HUD...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1200);
  await page.click('button:has-text("Gemini 2.0 Live")');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Ping Benchmark")');
  await page.waitForTimeout(2500);

  // 8. Close Diagnostics HUD & Scroll Down to Capabilities
  console.log('📸 8. Capabilities Section & Marquee...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }));
  await page.waitForTimeout(4000);

  console.log('🎬 Closing browser recording...');
  await page.close();
  await context.close();
  await browser.close();

  // Find recorded WebM
  const files = fs.readdirSync(RAW_VIDEO_DIR).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    const rawWebm = path.join(RAW_VIDEO_DIR, files[0]);
    console.log(`🎞️ Mastering 1080p MP4 with AI narration: ${FINAL_MP4}`);
    execSync(`ffmpeg -y -stream_loop -1 -i "${rawWebm}" -i "${AUDIO_PATH}" -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${FINAL_MP4}"`);
    console.log(`🎉 Final Mastered Walkthrough Video saved to: ${FINAL_MP4}`);
  }
})();
