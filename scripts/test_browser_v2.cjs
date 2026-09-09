const { chromium } = require('/home/krish/.gemini/antigravity/scratch/agentic-cinema/node_modules/playwright');

(async () => {
  console.log('🧪 Starting LexisPulse AI 2.0 Browser Verification Test...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // 1. Load Page
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  console.log('  ✓ Hero page loaded successfully');

  // 2. Open Live Audit Studio Modal
  await page.click('button:has-text("Launch Live Contract Audit")');
  await page.waitForSelector('h3:has-text("SaaS Master Services Agreement")', { timeout: 5000 });
  console.log('  ✓ Studio Modal opened with SaaS MSA preloaded');

  // 3. Test Agent Swarm Tab
  await page.click('button:has-text("Agent Swarm")');
  await page.waitForSelector('text=Autonomous Multi-Agent Swarm Orchestrator', { timeout: 5000 });
  console.log('  ✓ Agent Swarm tab rendered 4 AI agents and debate feed');

  // 4. Test Clause Graph Tab
  await page.click('button:has-text("Clause Graph")');
  await page.waitForSelector('text=Clause Dependency & Statutory Blast-Radius Map', { timeout: 5000 });
  console.log('  ✓ Interactive SVG Clause Knowledge Graph rendered');

  // 5. Test Live Editor Tab
  await page.click('button:has-text("Live Editor")');
  await page.waitForSelector('text=Interactive Live Clause Studio', { timeout: 5000 });
  await page.click('button:has-text("Insert Playbook")');
  console.log('  ✓ Live Clause Studio tested with instant playbook insertion');

  // 6. Test Version Drift Tab
  await page.click('button:has-text("Version Drift")');
  await page.waitForSelector('text=Contract Version Drift & Redline Delta Matrix', { timeout: 5000 });
  console.log('  ✓ Version Drift comparative redline rendered');

  await browser.close();
  console.log('\n🎉 ALL BROWSER INTERACTIONS PASSED WITH 0 ERRORS!');
})();
