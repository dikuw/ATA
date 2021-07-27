const password = 'testpass0';

exports.login = async (page, username) => {
  await page.waitForSelector('#username');
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click('[data-testid="login-button"]');
};

exports.logout = async (page) => {
  await page.click('#profile-button');
  await page.waitForSelector('#sign-out');
  await page.click('#sign-out');
};

exports.createItem = async (page, dataValue, itemNamePrefix) => {
  //  creates a new item and opens it in Builder view
  await page.waitForSelector('#create-item-button');
  await page.click('#create-item-button');
  await page.waitForTimeout(1000);
  await page.click('[id="mui-component-select-itemType"]');
  await page.click(`[data-value="${dataValue}"]`);
  await page.click('[data-testid="item-type-selector"] #item-name-input');
  await page.type('[data-testid="item-type-selector"] #item-name-input', `${itemNamePrefix}${new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}`);                                                                                                  
  await page.waitForSelector('#item-create-btn');
  await page.waitForTimeout(1000);
  await page.click('[data-testid="item-type-selector"] #item-create-btn');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.MuiButton-textSizeSmall');
  await page.click('.MuiButton-textSizeSmall');
};

exports.openTableView = async (page, module, headerCategory, category) => {
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
};

exports.selectTableViewLastChild = async (page) => {
  await page.waitForSelector('tbody.MuiTableBody-root tr:nth-last-child(1)');
  await page.click('tbody.MuiTableBody-root tr:nth-last-child(1)');
  await page.waitForTimeout(1000);
};

exports.draftToUnderReview = async (page) => {
  await page.waitForSelector('#workflow-underReview');
  await page.click('#workflow-underReview');
  await page.waitForSelector('[data-testid="btn-yes"]');
  await page.click('[data-testid="btn-yes"]');
};

exports.underReviewToOwnerApprovalNoChangeOrder = async (page, owner) => {
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
  await page.click('[type="submit"');
  await page.waitForTimeout(1000);
};

exports.ownerApprovalToReleased = async (page, approver) => {
  await page.waitForSelector('[data-testid="item"] #workflow-released');
  await page.click('[data-testid="item"] #workflow-released');
  await page.click('[data-testid="btn-yes"]');
  await page.click('[type="checkbox"]');
  await page.type("#username", approver);
  await page.type("#password", password);
  await page.click('[type="submit"');
};