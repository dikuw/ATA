const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://test-company.qms-dry-run.nemedio.com/');
  // await page.screenshot({ path: 'example.png' });
  await page.type("#username", "biz_lead_user");
  await page.type("#password", "testpass0");
  await page.click('[data-testid="login-button"]');
  await page.waitForSelector('#create-item-button');
  await page.click('#create-item-button');
  await page.type('[data-testid="item-type-selector"] #item-name-input', `test`);
  await page.click('[id="mui-component-select-itemType"]');
  await page.click('[data-value="change_order"] span');
  await page.waitForSelector('#item-create-btn');
  await page.waitForTimeout(1000);
  await page.click('[data-testid="item-type-selector"] #item-create-btn');
})();