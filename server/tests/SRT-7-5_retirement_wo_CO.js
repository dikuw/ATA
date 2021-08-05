//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  5. Retirement without CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Run the test with 'SRT75("xyz")' where "xyz" is the prefix of the item type

const puppeteer = require('puppeteer');

const { tenant } = require('../data/tenant');

const { login, logout, createItem, openTableView } = require('../shared/shared');
const { selectTableViewLastChild } = require('../shared/shared');
const { draftToRetirementInitiated } = require('../shared/shared');
const { retirementInitiatedToRetired } = require('../shared/shared');
const { createDoc } = require('../shared/createOutput');
const { getItemType } = require('../shared/helpers');

exports.SRT75 = async (prefix) => {

  const switchUser = async (page, user, module, headerCategory, category) => {
    await logout(page);
    await login(page, user);
    await openTableView(page, module, headerCategory, category);
    await selectTableViewLastChild(page);
  };

  let itemType = getItemType(prefix)[0];

  const itemNamePrefix = 'SRT-7 5. Retirement without CO';

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  
  await page.goto(tenant);

  const { itemPrefix, dataValue, user, owner, approver, module, headerCategory, category, sort } = itemType;

  console.log(`Testing SRT-7 5. Retirement without CO ${sort}. ${itemPrefix}...`);

  let results = [];
  let screenshot = "";

  await login(page, user);
  //  SRT-7.4 -- Does Not Exist -> Draft
  await createItem(page, dataValue, itemNamePrefix);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.4_Draft.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.4 -- Does Not Exist -> Draft... `,
    image: screenshot,
  });
  //  SRT-7.96 -- Draft -> Retirement Initiated
  await switchUser(page, owner, module, headerCategory, category);
  await draftToRetirementInitiated(page, owner);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.96_RetirementInitiated.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.96 -- Draft -> Retirement Initiated... `,
    image: screenshot,
  });
  await switchUser(page, approver, module, headerCategory, category);
  //  SRT-7.98 -- Retirement Initiated -> Retired
  await retirementInitiatedToRetired(page, approver);
  await page.waitForTimeout(4000);
  screenshot = 'SRT-7.98_Retired.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.98 -- Retirement Initiated -> Retired... `,
    image: screenshot,
  });

  await logout(page);

  createDoc(`SRT-7 5. Retirement without CO ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Retirement without CO: ${itemPrefix}`, results);

  console.log(`SRT-7 5. Retirement without CO ${sort}. ${itemPrefix} test passed`);

  await browser.close();

};

