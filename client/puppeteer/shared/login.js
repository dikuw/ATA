const puppeteer = require('puppeteer');

const password = 'testpass0';

exports.login = async (username) => {
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click('[data-testid="login-button"]');
};