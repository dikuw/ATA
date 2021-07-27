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
  await page.waitForSelector('#create-item-button');
  await page.click('#create-item-button');
  await page.click('[id="mui-component-select-itemType"]');
  await page.click(`[data-value="${dataValue}"]`);
  await page.click('[data-testid="item-type-selector"] #item-name-input');
  await page.type('[data-testid="item-type-selector"] #item-name-input', `${itemNamePrefix}${new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}`);                                                                                                  
  await page.waitForSelector('#item-create-btn');
  await page.waitForTimeout(1000);
  await page.click('[data-testid="item-type-selector"] #item-create-btn');
};