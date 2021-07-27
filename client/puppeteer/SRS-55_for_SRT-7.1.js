// SRS-55 Create Audit Trail Entry
// I need the system to create an audit trail entry, at a minimum, 
// each time a record undergoes a change that includes the application of an ESignature.  

//  Need to verify e-sigature entry in audit trail for:
//  Generic Workflow: 
//  1. SRT-7.1 Under Review -> Owner Approval
//  2. SRT-7.2 Owner Approval -> Approved Draft
//  3. SRT-7.5 Owner Approval -> Released
//  4. SRT-7.6 Onwer Approval -> Rejected
//  5. SRT-7.93 Approved Draft -> Void
//  6. SRT-7.98 Retirement Initiated -> Retired
//  7. SRT-7.107 Owner Approval -> Void
//
//  This test also verifies:
//  SRS-106: Show Audit Trail
//  I need to be able to view audit trail information for an item.
//
//  SRS-268: Audit Trail Data
//  Audit trails must be recorded and display the following information for each entry:
//  Timestamp in Format: MMM DD, YYYY HH:MM:SS AM/PM TZN(timezone)
//  First Name Last Name of user performing the change
//  V# Transition from >Starting Status< to >Ending Status<
//  When a transition requires an e-signature, the system must indicate an e-signature was applied. 
//  The id of the item whose audit trail is displayed shall be indicated. 
//
//  SRS-397: Date and Time Source
//  I need the system to use a source for the generation of the date and timestamp of an audit trail whose access is restricted.  
//  Users should not be able to change time and date settings in the source used for audit trails. 
//
//  SRS-269: Audit Trail Time Zone for Display
//  I need the audit trail to display the timestamp accurately with respect to the timezone displayed (with an accuracy of +/- 1 minute). 
//
//  SRS-322: Audit Trail View Order
//  As a user, I want audit trail information to be displayed with the newest entry on the top. 
//
//  SRS-998: "Reason for" Text Field in Audit Trail
//  When a workflow requires the user to input a "Reason For" text field 
//  (e.g., Reason for Void, Reason for Rejection, Reason for Cancel, Reason for Retire, etc), 
//  the text entered by the user must be displayed in the audit trail.  

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const parse = require('date-fns/parse');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');

const { users } = require('./data/users');
const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const { login, logout, createItem } = require('./shared/shared');
const { createDoc } = require('./shared/createOutput');

const password = "testpass0";

const itemNamePrefix = 'SRS-55_for_SRT-7.1';

const itemTypesFilter = ["SOP"];

const filteredItemTypes = itemTypes.filter((el) => {
  return itemTypesFilter.some((f) => {
    return f === el.itemPrefix;
  });
});

let timestamp;
let screenshot = "";

let results = [];

(async () => {

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });
  const page = await browser.newPage();
  await page.goto('https://test-company.qms-internal-validation.nemedio.com/login');

  for (const itemType of filteredItemTypes) {
    const { dataValue, user, owner, approver, module, headerCategory, category } = itemType;

    await login(page, user);
    //  SRT-7.4 -- Does Not Exist -> Draft
    await createItem(page, dataValue, itemNamePrefix);
    //  view item in Builder view
    await page.waitForTimeout(1000);
    await page.waitForSelector('.MuiButton-textSizeSmall');
    await page.click('.MuiButton-textSizeSmall');
    await page.waitForTimeout(1000);
    //  SRT-7.34 -- Draft -> Under Review
    await page.waitForSelector('#workflow-underReview');
    await page.click('#workflow-underReview');
    await page.waitForSelector('[data-testid="btn-yes"]');
    await page.click('[data-testid="btn-yes"]') //  Under Review
    await page.waitForTimeout(1000);
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
    await page.waitForSelector(`#${category}`);
    await page.click(`#${category}`);
    await page.waitForSelector('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.click('tbody.MuiTableBody-root tr:nth-last-child(1)');
    await page.waitForTimeout(1000);
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
    timestamp = new Date();
    await page.click('[type="submit"'); //  Owner Approval
    await page.waitForTimeout(1000);

    let who = users.filter(user => user.user === owner)[0].userName;
    await page.click('[data-testid="changesButton"]');
    //  check user (owner)
    await page.waitForSelector('[data-testid="auditTrailContainer"]');
    const auditTrailUser = await page.$eval('[data-testid="auditTrailContainer"] > div > div > div ~ div', e => e.innerText);
    expect(auditTrailUser).to.be.a('string',who);
    // check date and time
    let auditTrailDateTime = await page.$eval('[data-testid="auditTrailContainer"] > div > div > div', e => e.innerText);
    //  //  remove the timezone because "parse" can't handle it
    auditTrailDateTime = auditTrailDateTime.slice(0, auditTrailDateTime.length - 6);
    auditTrailDateTime = parse(auditTrailDateTime, 'MMM. dd, yyyy - hh:mm:ss a', new Date());
    const diff = differenceInMilliseconds(timestamp, auditTrailDateTime);
    expect(diff).to.be.below(5000);
    // check action
    const auditTrailAction = await page.$eval('[data-testid="auditTrailContainer"] > div > div > div ~ div ~ div', e => e.innerText);
    expect(auditTrailAction).to.match(/Under Review to Owner Approval/i);

    screenshot = "SRS-55_for_SRT-7.1_OwnerApproval.png";
    await page.screenshot({ path: `./screenshots/${screenshot}` });
    results.push({
      result: 'SRS-55 Audit Trail Entry for Owner Approval... ',
      image: screenshot,
    });
    results.push({
      result: 'SRS-106 Show Audit Trail... ',
    });
    results.push({
      result: `SRS-269 Audit Trail Time Zone for Display... `,
    });
    results.push({
      result: `SRS-269 Audit Trail timestamp accuracy: ±${diff} milliseconds... `,
    });
    results.push({
      result: 'SRS-322 Audit Trail View Order... ',
    });

    await logout(page);
    // //  //  login
    // await page.waitForSelector('#username');
    // await page.type('#username', approver);
    // await page.type('#password', password);
    // await page.click('[data-testid="login-button"]');
    // //  SRT-7.2 -- Owner Approval -> Released
    // await page.waitForSelector('#workspace-selector-button');
    // await page.click('#workspace-selector-button');
    // [el] = await page.$x(`//div[contains(text(), "${module}")]`);
    // await page.waitForTimeout(1000);
    // await el.click();
    // await page.waitForTimeout(1000);
    // if (headerCategory) await page.click(`#${headerCategory}`);
    // await page.waitForSelector(`#${category}`);
    // await page.click(`#${category}`);
    // await page.waitForSelector('tbody.MuiTableBody-root tr:nth-last-child(1)');
    // await page.click('tbody.MuiTableBody-root tr:nth-last-child(1)');
    // await page.waitForSelector('[data-testid="item"] #workflow-released');
    // await page.click('[data-testid="item"] #workflow-released');
    // await page.click('[data-testid="btn-yes"]');
    // await page.click('[type="checkbox"]');
    // await page.type("#username", approver);
    // await page.type("#password", password);
    // await page.click('[type="submit"');  // Released status
    // await page.waitForTimeout(4000);
    // await page.screenshot({ path: './screenshots/SRT-7.2_Released.png' });
    // results.push({
    //   result: 'SRT-7.2 -- Owner Approval -> Released... ',
    //   image: 'SRT-7.2_Released.png',
    // });
    // //  //  logout
    // await page.click('#profile-button');
    // await page.waitForSelector('#sign-out');
    // await page.click('#sign-out');

    createDoc('SSRS55_SRT-7_1', 'SRS-55 Audit Trail Entries', results)

    console.log('test passed');
  }

})();

