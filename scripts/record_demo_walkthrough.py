import asyncio
import os
import subprocess
import time
import edge_tts

DEMO_SCRIPT = """
Welcome to LexisPulse AI, the enterprise autonomous legal contract intelligence and redline operating system built for PromptWars 2026 and powered by Google Gemini 2.0 Flash.
Reviewing commercial agreements, SaaS MSAs, and employment contracts manually takes hours and risks multi-million dollar liabilities.
LexisPulse ingests legal documents in sub-300 milliseconds, decomposing them into abstract syntax clause trees.
Our 6-vector risk radar detects uncapped indemnities, automatic 3-year renewals, and non-compete covenants.
With bilateral redline diffing, Gemini synthesizes fair, balanced counter-clauses with verified statutory citations to Delaware Corporate Law, FTC rules, and California Labor Code.
LexisPulse provides plain-English translations, grounded Q&A, and immutable SHA-256 cryptographic attestation tokens for enterprise-grade audit readiness.
"""

VOICE = "en-US-AndrewMultilingualNeural"
OUTPUT_DIR = "/home/krish/.gemini/antigravity/scratch/lexispulse-ai/gallery"
AUDIO_PATH = os.path.join(OUTPUT_DIR, "lexispulse_ai_narration.mp3")
RAW_VIDEO_DIR = os.path.join(OUTPUT_DIR, "raw_video")
FINAL_MP4 = "/home/krish/Documents/LexisPulse_Demo_Walkthrough.mp4"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(RAW_VIDEO_DIR, exist_ok=True)

async def generate_voiceover():
    print(f"🎙️ Generating synthetic AI narration ({VOICE})...")
    communicate = edge_tts.Communicate(DEMO_SCRIPT, VOICE, rate="+4%")
    await communicate.save(AUDIO_PATH)
    print(f"✅ AI Voiceover saved to {AUDIO_PATH}")

def run_browser_automation():
    print("🎬 Starting Playwright browser automation for 1080p demo recording...")
    js_automation = f"""
    const {{ chromium }} = require('/home/krish/.gemini/antigravity/scratch/agentic-cinema/node_modules/playwright');
    const path = require('path');

    (async () => {{
        const browser = await chromium.launch({{ headless: true, args: ['--no-sandbox'] }});
        const context = await browser.newContext({{
            viewport: {{ width: 1920, height: 1080 }},
            recordVideo: {{
                dir: '{RAW_VIDEO_DIR}',
                size: {{ width: 1920, height: 1080 }}
            }}
        }});

        const page = await context.newPage();
        console.log('🌐 Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', {{ waitUntil: 'networkidle' }});
        await page.waitForTimeout(3000);

        // 1. Hero Overview & Contract Switcher
        console.log('📸 1. Interacting with Hero Preloaders...');
        await page.click('button:has-text("Silicon Valley Mutual Non-Disclosure")');
        await page.waitForTimeout(1500);
        await page.click('button:has-text("Executive Employment & IP Transfer")');
        await page.waitForTimeout(1500);
        await page.click('button:has-text("SaaS Master Services Agreement")');
        await page.waitForTimeout(1500);

        // 2. Open Live Audit Studio
        console.log('📸 2. Launching Live Audit Studio Modal...');
        await page.click('button:has-text("Launch Live Contract Audit")');
        await page.waitForTimeout(2500);

        // 3. Side-by-Side Redline & Accept Patch
        console.log('📸 3. Accepting Remediations & Toggling Redlines...');
        await page.click('button:has-text("Accept Patch")');
        await page.waitForTimeout(2000);
        await page.click('button:has-text("Inline Diff")');
        await page.waitForTimeout(2000);
        await page.click('button:has-text("Side-by-Side")');
        await page.waitForTimeout(1500);

        // 4. Switch to Risk Matrix
        console.log('📸 4. Viewing 6-Vector Risk Matrix...');
        await page.click('button:has-text("Risk Matrix")');
        await page.waitForTimeout(3000);

        // 5. Switch to Plain English ELI5
        console.log('📸 5. Viewing Plain English ELI5 Translations...');
        await page.click('button:has-text("Plain English")');
        await page.waitForTimeout(3000);

        // 6. Grounded Q&A Assistant
        console.log('📸 6. Interacting with Grounded Q&A Assistant...');
        await page.click('button:has-text("Grounded Q&A")');
        await page.waitForTimeout(1500);
        await page.fill('input[placeholder*="Ask live Gemini"]', 'What is our liability exposure under Section 9.2?');
        await page.waitForTimeout(800);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3500);

        // 7. Close Studio & Open API Diagnostics HUD
        console.log('📸 7. Opening API Diagnostics HUD...');
        await page.click('div.flex.items-center.justify-between button:has-text("X"), div.fixed.inset-0 button.w-9.h-9');
        await page.waitForTimeout(1000);
        await page.click('button:has-text("Gemini 2.0 Live")');
        await page.waitForTimeout(2500);
        await page.click('button:has-text("Ping Benchmark")');
        await page.waitForTimeout(2000);

        // 8. Scroll Down to Capabilities
        console.log('📸 8. Scrolling to Capabilities & Marquee...');
        await page.click('div.fixed.inset-0 button.w-8.h-8');
        await page.waitForTimeout(800);
        await page.evaluate(() => window.scrollTo({{ top: window.innerHeight, behavior: 'smooth' }}));
        await page.waitForTimeout(3500);

        await page.close();
        await context.close();
        await browser.close();
        console.log('✅ Browser recording finished.');
    }})();
    """

    runner_path = os.path.join(OUTPUT_DIR, "runner.js")
    with open(runner_path, "w") as f:
        f.write(js_automation)

    subprocess.run(["node", runner_path], check=True)

def master_video():
    print("🎞️ Mastering 1080p MP4 video with AI narration...")
    webm_files = [f for f in os.listdir(RAW_VIDEO_DIR) if f.endsWith(".webm")] if hasattr(str, 'endsWith') else [f for f in os.listdir(RAW_VIDEO_DIR) if f.endswith(".webm")]
    if not webm_files:
        print("❌ No raw webm found.")
        return

    raw_webm = os.path.join(RAW_VIDEO_DIR, webm_files[0])
    
    # Render final mastered MP4 matching audio duration
    cmd = [
        "ffmpeg", "-y",
        "-stream_loop", "-1",
        "-i", raw_webm,
        "-i", AUDIO_PATH,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        FINAL_MP4
    ]
    subprocess.run(cmd, check=True)
    print(f"🎉 Final Mastered Walkthrough Video exported to: {FINAL_MP4}")

async def main():
    await generate_voiceover()
    run_browser_automation()
    master_video()

if __name__ == "__main__":
    asyncio.run(main())
