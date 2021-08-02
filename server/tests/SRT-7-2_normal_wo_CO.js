//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  2. Normal path without a CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Run the test with 'SRT72("xyz")' where "xyz" is the prefix of the item type

const puppeteer = require('puppeteer');

const { tenant } = require('../data/tenant');

const { login, logout, createItem, openTableView } = require('../shared/shared');
const { selectTableViewLastChild, draftToUnderReview } = require('../shared/shared');
const { underReviewToOwnerApproval, ownerApprovalToReleased } = require('../shared/shared');
const { createDoc } = require('../shared/createOutput');

const { getItemType } = require('../shared/helpers');

exports.SRT72 = async (prefix) => {
  let itemType = getItemType(prefix)[0];

  const itemNamePrefix = 'SRT-7 2. Normal Path without CO';

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  
  await page.goto(tenant);

  const { itemPrefix, dataValue, user, owner, approver, module, headerCategory, category, sort } = itemType;

  console.log(`Testing ${sort}. ${itemPrefix}...`);

  let results = [];
  let screenshot = "";

  await login(page, user);
  //  SRT-7.4 -- Does Not Exist -> Draft
  await createItem(page, dataValue, itemNamePrefix);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.4_Draft.png';
  await page.screenshot({ path: `./screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.4 -- Does Not Exist -> Draft... `,
    image: screenshot,
  });
  //  SRT-7.34 -- Draft -> Under Review
  await draftToUnderReview(page);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.34_UnderReview.png';
  await page.screenshot({ path: `./screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.34 -- Draft -> Under Review... `,
    image: screenshot,
  });
  await logout(page);
  await login(page, owner);
  await openTableView(page, module, headerCategory, category);
  await selectTableViewLastChild(page);
  //  SRT-7.1 -- Under Review -> Owner Approval
  await underReviewToOwnerApproval(page, owner);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.1_OwnerApproval.png';
  await page.screenshot({ path: `./screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.1 -- Under Review -> Owner Approval... `,
    image: screenshot,
  });
  await logout(page);
  await login(page, approver);
  await openTableView(page, module, headerCategory, category);
  await selectTableViewLastChild(page);
  //  SRT-7.5 -- Owner Approval -> Released
  await ownerApprovalToReleased(page, approver);
  screenshot = 'SRT-7.5_Released.png';
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `./screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.5 -- Owner Approval -> Released... `,
    image: screenshot,
  });
  await logout(page);

  createDoc(`SRT-7 Normal Path without CO ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Normal Path without CO: ${itemPrefix}`, results);

  console.log(`SRT-7 Normal Path without CO ${sort}. ${itemPrefix} test passed`);

  await browser.close();

};