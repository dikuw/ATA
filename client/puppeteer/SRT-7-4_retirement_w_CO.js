//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  4. Retirement with CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Item types should be set up in the itemTypes arrary
//  Include one or more item type prefixes in the itemTypesFilter array to run the test with those item types

const puppeteer = require('puppeteer');

const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const changeOrderOwner = "pm_user";
const changeOrderApprover = "qa_lead_user";

const { login, logout, createItem, openTableView } = require('./shared/shared');
const { selectTableViewLastChild } = require('./shared/shared');
const { draftToReadyForClosure, readyForClosureToClosed } = require('./shared/shared');
const { draftToRetirementInitiated, retirementInitiatedToRetirementCanceled, retirementInitiatedToRetirementRejected } = require('./shared/shared');
const { retirementRejectedToDraft, retirementInitiatedToApprovedRetirement } = require('./shared/shared');
const { createDoc } = require('./shared/createOutput');

const switchUser = async (page, user, module, headerCategory, category) => {
  await logout(page);
  await login(page, user);
  await openTableView(page, module, headerCategory, category);
  await selectTableViewLastChild(page);
};

const itemNamePrefix = 'SRT-7 4. Retirement with CO';

const itemTypesFilter = ["POL"];
const exclude = ["DRV", "D-UND", "D-REQ", "MIT", "STD", "FRM", "RKN"];

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
    await createItem(page, "change_order", "SRT-7 4. CO");
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
    //  SRT-7.96 -- Draft -> Retirement Initiated
    await switchUser(page, owner, module, headerCategory, category);
    await draftToRetirementInitiated(page, owner, true);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.96_RetirementInitiated.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.96 -- Draft -> Retirement Initiated... `,
      image: screenshot,
    });
    await switchUser(page, approver, module, headerCategory, category);
    //  SRT-7.110 -- Retirement Initiated -> Approved Retirement
    await retirementInitiatedToApprovedRetirement(page, approver);
    await page.waitForTimeout(2000);
    screenshot = 'SRT-7.110_ApprovedRetirement.png';
    await page.screenshot({ path: `./screenshots/${screenshot}` });
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
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: `SRT-7.106 -- Approved Retirement -> Retired... `,
      image: screenshot,
    });
    
    await logout(page);

    createDoc(`SRT-7 4. Retirement with CO ${sort}. ${itemPrefix}`, `SRT-7 Generic Workflow Retirement with CO: ${itemPrefix}`, results);

    console.log(`SRT-7 4. Retirement with CO ${sort}. ${itemPrefix} test passed`);

  }

  await browser.close();

})();

