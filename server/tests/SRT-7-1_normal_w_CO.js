//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  1. Normal path with a CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Run the test with 'SRT71("xyz")' where "xyz" is the prefix of the item type

const puppeteer = require('puppeteer');

const { tenant } = require('../data/tenant');

const changeOrderOwner = "pm_user";
const changeOrderApprover = "qa_lead_user";

const { login, logout, createItem, openTableView } = require('../shared/shared');
const { selectTableViewLastChild, draftToUnderReview } = require('../shared/shared');
const { underReviewToOwnerApproval, ownerApprovalToApprovedDraft } = require('../shared/shared');
const { draftToReadyForClosure, readyForClosureToClosed } = require('../shared/shared');
const { createDoc } = require('../shared/createOutput');

const { getItemType } = require('../shared/helpers');

exports.SRT71 = async (prefix) => {
  let itemType = getItemType(prefix)[0];
  const { itemPrefix, dataValue, user, owner, approver, module, headerCategory, category, sort } = itemType;

  let resultsString = "";
  let results = [];
  let screenshot = "";

  const itemNamePrefix = 'SRT-7 1. Normal Path with CO';

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  await page.goto(tenant);

  console.log(`❗❗❗ Testing SRT-7 1. Normal Path with CO ${sort}. ${itemPrefix}...`);
  console.log(`🕒 Test start time: ${new Date().toLocaleTimeString()}`);

  try {
    //  first create the change order for testing
    await login(page, changeOrderOwner);
    await createItem(page, "change_order", "SRT-7 1. CO");
    await logout(page);
    await login(page, user);
    //  SRT-7.4 -- Does Not Exist -> Draft
    await createItem(page, dataValue, itemNamePrefix);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.4_Draft.png';
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.4 -- Does Not Exist -> Draft... `,
      resultString: `test passed`,
      image: screenshot,
    });
    //  SRT-7.34 -- Draft -> Under Review
    await draftToUnderReview(page);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.34_UnderReview.png';
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.34 -- Draft -> Under Review... `,
      resultString: `test passed`,
      image: screenshot,
    });
    await logout(page);
    await login(page, owner);
    await openTableView(page, module, headerCategory, category);
    await selectTableViewLastChild(page);
    //  SRT-7.1 -- Under Review -> Owner Approval
    await underReviewToOwnerApproval(page, owner, true);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.1_OwnerApproval.png';
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.1 -- Under Review -> Owner Approval... `,
      resultString: `test passed`,
      image: screenshot,
    });
    await logout(page);
    await login(page, approver);
    await openTableView(page, module, headerCategory, category);
    await selectTableViewLastChild(page);
    //  SRT-7.2 -- Owner Approval -> Approved Draft
    await ownerApprovalToApprovedDraft(page, approver);
    screenshot = 'SRT-7.2_Released.png';
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.2 -- Owner Approval -> Released... `,
      resultString: `test passed`,
      image: screenshot,
    });
    // SRT-7.3 -- Approved Draft -> Released
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
    screenshot = 'SRT-7.3_Released.png';
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.3 -- Approved Draft -> Released... `,
      resultString: `test passed`,
      image: screenshot,
    });
    await logout(page);

    createDoc(`SRT-7 1. Normal Path with CO ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Normal Path with CO: ${itemPrefix}`, results);
    resultsString = `🙌 SRT-7 1. Normal Path with CO ${sort}. ${itemPrefix} test passed`;

  } catch (err) {

    screenshot = 'error.png';
    await page.screenshot({ path: `./tests/screenshots/${screenshot}` });
    results.push({
      result: `ERROR... `,
      resultString: `test error`,
      image: screenshot,
    });

    createDoc(`ERROR SRT-7 1. Normal Path with CO ${sort}. ${itemPrefix}`, `ERROR: SRT-7 1. Normal Path with CO: ${itemPrefix}`, results);
    resultsString = `❌ ERROR: SRT-7 1. Normal Path with CO ${sort}. ${itemPrefix}: ${err}`;

  } finally {

    await browser.close();

    console.log(`🕕 Test end time: ${new Date().toLocaleTimeString()}`);
    console.log(resultsString);

    return resultsString;
  }

};