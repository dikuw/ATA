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

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  });
  const page = await browser.newPage();
  await page.goto(tenant);

  for (const itemType of filteredItemTypes) {
    const { dataValue, user, owner, approver, module, headerCategory, category } = itemType;
    //  //  login
    await page.type('#username', user);
    await page.type('#password', password);
    await page.click('[data-testid="login-button"]');
    //  SRT-7.4 -- Does Not Exist -> Draft
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
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './screenshots/SRT-7.4_Draft.png' });
    //  SRT-7.34 -- Draft -> Under Review
    await page.waitForSelector('#workflow-underReview');
    await page.click('#workflow-underReview');
    await page.waitForSelector('[data-testid="btn-yes"]');
    await page.click('[data-testid="btn-yes"]') //  Under Review
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './screenshots/SRT-7.34_UnderReview.png' });
    //  //  logout
    await page.click('#profile-button');
    await page.click('#sign-out');
    //  //  login
    await page.waitForSelector('#username');
    await page.type('#username', owner);
    await page.type('#password', password);
    await page.click('[data-testid="login-button"]');
    //  SRT-7.1 -- Under Review -> Owner Approval -- SRT-7.1
    await page.waitForSelector('#workspace-selector-button');
    await page.click('#workspace-selector-button');
    await page.waitForTimeout(2000);
    let [el] = await page.$x(`//div[contains(text(), "${module}")]`);
    await page.waitForTimeout(2000);
    await el.click();
    await page.waitForTimeout(2000);
    if (headerCategory) await page.click(`#${headerCategory}`);
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
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './screenshots/SRT-7.1_OwnerApproval.png' });
    //  //  logout
    await page.click('#profile-button');
    await page.waitForSelector('#sign-out');
    await page.click('#sign-out');
    //  //  login
    await page.waitForSelector('#username');
    await page.type('#username', approver);
    await page.type('#password', password);
    await page.click('[data-testid="login-button"]');
    //  SRT-7.2 -- Owner Approval -> Released -- SRT-7.2
    await page.waitForSelector('#workspace-selector-button');
    await page.click('#workspace-selector-button');
    [el] = await page.$x(`//div[contains(text(), "${module}")]`);
    await page.waitForTimeout(2000);
    await el.click();
    await page.waitForTimeout(2000);
    if (headerCategory) await page.click(`#${headerCategory}`);
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
    await page.screenshot({ path: './screenshots/SRT-7.2_Released.png' });
    //  //  logout
    await page.click('#profile-button');
    await page.waitForSelector('#sign-out');
    await page.click('#sign-out');

    console.log('test passed');
  }

})();

