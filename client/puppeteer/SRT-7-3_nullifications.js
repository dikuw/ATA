//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  3. Nullifications (cancel, void, and reject)
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Item types should be set up in the itemTypes arrary
//  Include one or more item type prefixes in the itemTypesFilter array to run the test with those item types

const puppeteer = require('puppeteer');

const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const changeOrderOwner = "pm_user";

const { login, logout, createItem, openTableView } = require('./shared/shared');
const { selectTableViewLastChild, draftToUnderReview } = require('./shared/shared');
const { underReviewToOwnerApproval, ownerApprovalToApprovedDraft } = require('./shared/shared');
const { underReviewToDraft, voidOwnerApproval, ownerApprovalToRejected, rejectedToDraft, voidApprovedDraft  } = require('./shared/shared');
const { underReviewToCanceled, draftToCanceled, createNewVersion } = require('./shared/shared');
const { createDoc } = require('./shared/createOutput');

const switchUser = async (page, user, module, headerCategory, category) => {
  await logout(page);
  await login(page, user);
  await openTableView(page, module, headerCategory, category);
  await selectTableViewLastChild(page);
};

const itemNamePrefix = 'SRT-7 3. Nullifications';

const itemTypesFilter = ["WI"];
const exclude = ["DRV", "D-UND", "D-REQ", "STD", "FRM", "RKN"];

let filteredItemTypes = itemTypes.filter((el) => {
  return itemTypesFilter.some((f) => {
    return f === el.itemPrefix;
  });
});

if (itemTypesFilter.length === 0) {
  //  then include all item types except the ones in the 'exclude' array
  filteredItemTypes = itemTypes.filter((el) => {
    return !exclude.some((f) => {
      return f === el.itemPrefix;
    });
  });
}

(async () => {

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });

  const page = await browser.newPage();
  
  await page.goto(tenant);

  for (const itemType of filteredItemTypes) {
    const { itemPrefix, dataValue, user, owner, approver, module, headerCategory, category, sort } = itemType;

    let results = [];
    let screenshot = "";

    //  first create the change order for testing
    await login(page, changeOrderOwner);
    await createItem(page, "change_order", "SRT-7 3. CO");
    await logout(page);

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
    await switchUser(page, owner, module, headerCategory, category);
    //  SRT-7.35 -- Under Review -> Draft
    await underReviewToDraft(page);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.35_Draft.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.35 -- Under Review -> Draft... `,
      image: screenshot,
    });
    //  SRT-7.34 -- Draft -> Under Review
    await draftToUnderReview(page);
    await page.waitForTimeout(2000);
    //  SRT-7.1 -- Under Review -> Owner Approval
    await underReviewToOwnerApproval(page, owner, true);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.1_OwnerApproval_1.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.1 -- Under Review -> Owner Approval... `,
      image: screenshot,
    });
    //  SRT-7.107 -- Owner Approval -> Void
    await voidOwnerApproval(page, owner);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.107_VoidOwnerApproval.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.107 -- Owner Approval -> Void... `,
      image: screenshot,
    });
    //  SRT-7.1 -- Under Review -> Owner Approval
    await underReviewToOwnerApproval(page, owner, true);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.1_OwnerApproval_2.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.1 -- Under Review -> Owner Approval... `,
      image: screenshot,
    });
    await switchUser(page, approver, module, headerCategory, category);
    //  SRT-7.6 -- Owner Approval -> Rejected
    await ownerApprovalToRejected(page, approver);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.6_Rejected.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.6 -- Owner Approval -> Rejected... `,
      image: screenshot,
    });
    await switchUser(page, user, module, headerCategory, category);
    //  SRT-7.7 -- Rejected -> Draft
    await rejectedToDraft(page);
    screenshot = 'SRT-7.7_Draft.png';
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.7 -- Rejected -> Draft... `,
      image: screenshot,
    });
    //  SRT-7.34 -- Draft -> Under Review
    await draftToUnderReview(page);
    await switchUser(page, owner, module, headerCategory, category);
    //  SRT-7.1 -- Under Review -> Owner Approval
    await underReviewToOwnerApproval(page, owner, true);
    await switchUser(page, approver, module, headerCategory, category);
    //  SRT-7.2 -- Owner Approval -> Approved Draft
    await ownerApprovalToApprovedDraft(page, approver);
    screenshot = 'SRT-7.2_Released.png';
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.2 -- Owner Approval -> Released... `,
      image: screenshot,
    });
    //  SRT-7.93 -- Approved Draft -> Void
    await voidApprovedDraft(page, approver);
    screenshot = 'SRT-7.93_Void.png';
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.93 -- Approved Draft -> Void... `,
      image: screenshot,
    });
    await switchUser(page, owner, module, headerCategory, category);
    //  SRT-7.107 -- Owner Approval -> Void
    await voidOwnerApproval(page, owner);
    await page.waitForTimeout(2000);
    //  SRT-7.127 -- Under Review -> Canceled
    await underReviewToCanceled(page, owner);
    screenshot = 'SRT-7.127_Canceled.png';
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.127 -- Under Review -> Canceled... `,
      image: screenshot,
    });
    //  SRT-7.113 -- Draft -> Canceled
    await createNewVersion(page);
    await page.waitForTimeout(2000);
    await draftToCanceled(page, owner);
    screenshot = 'SRT-7.113_Canceled.png';
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.113 -- Draft -> Canceled... `,
      image: screenshot,
    });

    await logout(page);

    createDoc(`SRT-7 Nullifications ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Nullifications: ${itemPrefix}`, results);

    console.log(`SRT-7 Nullifications ${sort}. ${itemPrefix} test passed`);

  }

  await browser.close();

})();

