exports.logout = async (page) => {
  await page.click('#profile-button');
  await page.waitForSelector('#sign-out');
  await page.click('#sign-out');
};