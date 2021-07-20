const puppeteer = require('puppeteer');

const { users } = require('./data/users');
const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const password = "testpass0";

const itemNamePrefix = 'SRT-7noCO';

const itemTypesFilter = ["SOP"];

const filteredItemTypes = itemTypes.filter((el) => {
  return itemTypesFilter.some((f) => {
    return f === el.itemPrefix;
  });
});

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(tenant);

  for (const itemType of filteredItemTypes) {
    const { dataValue, user, owner, approver, module, headerCategory, category } = itemType;
    //  login
    await page.type("#username", user);
    await page.type("#password", password);
    await page.click('[data-testid="login-button"]');
    //  create item
    await page.waitForSelector('#create-item-button');
    await page.click('#create-item-button');
    await page.click('[id="mui-component-select-itemType"]');
    await page.click(`[data-value="${dataValue}"]`);
    await page.click('[data-testid="item-type-selector"] #item-name-input');
    await page.type('[data-testid="item-type-selector"] #item-name-input', `${itemNamePrefix}${new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}`);                                                                                                  
    await page.waitForSelector('#item-create-btn');
    await page.waitForTimeout(2000);
    await page.click('[data-testid="item-type-selector"] #item-create-btn');
    //  view item in Builder view
    await page.waitForTimeout(2000);
    await page.waitForSelector('.MuiButton-textSizeSmall');
    await page.click('.MuiButton-textSizeSmall');
    console.log('test passed');
  }

})();

