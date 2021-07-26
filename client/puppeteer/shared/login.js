const puppeteer = require('puppeteer');

const password = 'testpass0';

exports.login = async (page, username) => {
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click('[data-testid="login-button"]');
};