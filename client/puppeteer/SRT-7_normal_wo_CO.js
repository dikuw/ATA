const puppeteer = require('puppeteer');

const users = require('./data/users');
const itemTypes = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const changeOrderOwner = "pm_user";
const changeOrderApprover = "qa_lead_user";
const password = "testpass0";

const itemNamePrefix = 'SRT-7noCO';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(tenant);
  await page.type("#username", changeOrderOwner);
  await page.type("#password", password);
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