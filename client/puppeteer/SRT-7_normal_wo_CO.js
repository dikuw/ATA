//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  2. Normal path without a CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Item types should be set up in the itemTypes arrary
//  Include one or more item type prefixes in the itemTypesFilter array to run the test with those item types

const puppeteer = require('puppeteer');

const { users } = require('./data/users');
const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const { login, logout, createItem } = require('./shared/shared');
const { createDoc } = require('./shared/createOutput');

const password = "testpass0";

const itemNamePrefix = 'SRT-7noCO';

const itemTypesFilter = ["SOP"];

const filteredItemTypes = itemTypes.filter((el) => {
  return itemTypesFilter.some((f) => {
    return f === el.itemPrefix;
  });
});

let results = [];
let screenshot = "";

(async () => {

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  
  await page.goto(tenant);

  for (const itemType of filteredItemTypes) {
    const { dataValue, user, owner, approver, module, headerCategory, category } = itemType;

    await login(page, user);
    //  SRT-7.4 -- Does Not Exist -> Draft
    await createItem(page, dataValue, itemNamePrefix);
    screenshot = 'SRT-7.4_Draft.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: 'SRT-7.4 -- Does Not Exist -> Draft... ',
      image: screenshot,
    });
    //  SRT-7.34 -- Draft -> Under Review
    await page.waitForSelector('#workflow-underReview');
    await page.click('#workflow-underReview');
    await page.waitForSelector('[data-testid="btn-yes"]');
    await page.click('[data-testid="btn-yes"]') //  Under Review
    await page.waitForTimeout(1000);
    screenshot = 'SRT-7.34_UnderReview.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: 'SRT-7.34 -- Draft -> Under Review... ',
      image: screenshot,
    });
    await logout(page);
    await login(page, owner);
    //  SRT-7.1 -- Under Review -> Owner Approval
    await page.waitForSelector('#workspace-selector-button');
    await page.click('#workspace-selector-button');
    await page.waitForTimeout(1000);
    let [el] = await page.$x(`//div[contains(text(), "${module}")]`);
    await page.waitForTimeout(1000);
    await el.click();
    await page.waitForTimeout(1000);
    if (headerCategory) await page.click(`#${headerCategory}`);
    await page.waitForTimeout(1000);
    await page.waitForSelector(`#${category}`);
    await page.click(`#${category}`);
    await page.waitForSelector('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.click('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.waitForSelector('[data-testid="item"] #workflow-ownerApproval');
    await page.click('[data-testid="item"] #workflow-ownerApproval');
    await page.click('[data-testid="btn-yes"]');
    await page.type('#reason-for-change', 'Test RoC');
    await page.type('#need-description', 'Test DoC');
    await page.click('#change-summary-submit');
    await page.click('#transition-modal [type="button"]');
    await page.type('textarea', 'test justification');
    await page.click('#justify-next');
    await page.click('[type="checkbox"]');
    await page.type('#username', owner);
    await page.type('#password', password);
    await page.click('[type="submit"'); //  Owner Approval
    await page.waitForTimeout(1000);
    screenshot = 'SRT-7.1_OwnerApproval.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: 'SRT-7.1 -- Under Review -> Owner Approval... ',
      image: screenshot,
    });
    //  //  logout
    await logout(page);
    await login(page, approver);
    //  SRT-7.2 -- Owner Approval -> Released
    await page.waitForSelector('#workspace-selector-button');
    await page.click('#workspace-selector-button');
    [el] = await page.$x(`//div[contains(text(), "${module}")]`);
    await page.waitForTimeout(1000);
    await el.click();
    await page.waitForTimeout(1000);
    if (headerCategory) await page.click(`#${headerCategory}`);
    await page.waitForTimeout(1000);
    await page.waitForSelector(`#${category}`);
    await page.click(`#${category}`);
    await page.waitForSelector('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.click('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.waitForSelector('[data-testid="item"] #workflow-released');
    await page.click('[data-testid="item"] #workflow-released');
    await page.click('[data-testid="btn-yes"]');
    await page.click('[type="checkbox"]');
    await page.type("#username", approver);
    await page.type("#password", password);
    await page.click('[type="submit"');  // Released status
    await page.waitForTimeout(4000);
    screenshot = 'SRT-7.2_Released.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: 'SRT-7.2 -- Owner Approval -> Released... ',
      image: screenshot,
    });
    await logout(page);

    createDoc('SRT7_2', 'SRT-7 Generic Workflow', results)

  }

  console.log('test passed');

})();

