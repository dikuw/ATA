//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  6. Retirement Nullifications
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Run the test with 'SRT76("xyz")' where "xyz" is the prefix of the item type

const puppeteer = require('puppeteer');

const { tenant } = require('../data/tenant');

const changeOrderOwner = "pm_user";
const changeOrderApprover = "qa_lead_user";

const { login, logout, createItem, openTableView } = require('../shared/shared');
const { selectTableViewLastChild } = require('../shared/shared');
const { draftToReadyForClosure, readyForClosureToClosed } = require('../shared/shared');
const { draftToRetirementInitiated, retirementInitiatedToRetirementCanceled, retirementInitiatedToRetirementRejected } = require('../shared/shared');
const { retirementRejectedToDraft, retirementInitiatedToApprovedRetirement } = require('../shared/shared');
const { createDoc } = require('../shared/createOutput');
const { getItemType } = require('../shared/helpers');

exports.SRT76 = async (prefix) => {

  const switchUser = async (page, user, module, headerCategory, category) => {
    await logout(page);
    await login(page, user);
    await openTableView(page, module, headerCategory, category);
    await selectTableViewLastChild(page);
  };

  let itemType = getItemType(prefix)[0];

  const itemNamePrefix = 'SRT-7 6. Retirement Nullifications';

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  
  await page.goto(tenant);

  const { itemPrefix, dataValue, user, owner, approver, module, headerCategory, category, sort } = itemType;

  console.log(`Testing SRT-7 6. Retirement Nullifications ${sort}. ${itemPrefix}...`);

  let results = [];
  let screenshot = "";

  //  first create the change order for testing
  await login(page, changeOrderOwner);
  await createItem(page, "change_order", "SRT-7 4. CO");
  await logout(page);

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
  await draftToRetirementInitiated(page, owner, true);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.96_RetirementInitiated.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.96 -- Draft -> Retirement Initiated... `,
    image: screenshot,
  });
  //  SRT-7.117 -- Retirement Initiated -> Retirement Canceled
  await retirementInitiatedToRetirementCanceled(page, owner);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.117_RetirementCanceled.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.117 -- Retirement Initiated -> Retirement Canceled... `,
    image: screenshot,
  });
  await draftToRetirementInitiated(page, owner, true);
  await switchUser(page, approver, module, headerCategory, category);
  //  SRT-7.105 -- Retirement Initiated -> Retirement Rejected
  await retirementInitiatedToRetirementRejected(page, approver);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.105_RetirementRejected.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.105 -- Retirement Initiated -> Retirement Rejected... `,
    image: screenshot,
  });
  await switchUser(page, owner, module, headerCategory, category);
  //  SRT-7.7 -- Retirement Rejected -> Draft
  await retirementRejectedToDraft(page);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.7_Draft.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.7 -- Retirement Rejected -> Draft... `,
    image: screenshot,
  });
  await draftToRetirementInitiated(page, owner, true);
  await switchUser(page, approver, module, headerCategory, category);
  //  SRT-7.110 -- Retirement Initiated -> Approved Retirement
  await retirementInitiatedToApprovedRetirement(page, approver);
  await page.waitForTimeout(2000);
  screenshot = 'SRT-7.110_ApprovedRetirement.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.110 -- Retirement Initiated -> Approved Retirement... `,
    image: screenshot,
  });
  //  SRT-7.106 -- Approved Retirement -> Retired
  await logout(page);
  await login(page, changeOrderOwner);
  await openTableView(page, "Quality Management System", "", "category-change-order");
  await selectTableViewLastChild(page);
  await draftToReadyForClosure(page, changeOrderOwner);
  await logout(page);
  await login(page, changeOrderApprover);
  await openTableView(page, "Quality Management System", "", "category-change-order");
  await selectTableViewLastChild(page);
  await readyForClosureToClosed(page, changeOrderApprover);
  await openTableView(page, module, headerCategory, category);
  await selectTableViewLastChild(page);
  await page.waitForTimeout(1000);
  screenshot = 'SRT-7.106_Retired.png';
  await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
  results.push({
    result: `SRT-7.106 -- Approved Retirement -> Retired... `,
    image: screenshot,
  });
  
  await logout(page);

  createDoc(`SRT-7 6. Retirement Nullifications ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Retirement Nullifications: ${itemPrefix}`, results);

  console.log(`SRT-7 6. Retirement Nullifications ${sort}. ${itemPrefix} test passed`);

  await browser.close();

  return `SRT-7 6. Retirement Nullifications ${sort}. ${itemPrefix} test passed`;

}

