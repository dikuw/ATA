//  ** SRT-7 Generic Workflow **  //
//  This script tests the Generic workflow per SRT-7
//  2. Normal path without a CO
//
//  Any item type using the Generic workflow that is not a singleton can be tested
//  Item types should be set up in the itemTypes arrary
//  Include one or more item type prefixes in the itemTypesFilter array to run the test with those item types

const puppeteer = require('puppeteer');

const { users } = require('./data/users');
const { itemTypes } = require('./data/itemTypes');
const { tenant } = require('./data/tenant');

const { createDoc } = require('./shared/createOutput');

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
    let results = [
      {
        result: 'SRT-7.4 -- Does Not Exist -> Draft... testing passed',
        image: 'SRT-7.4_Draft.png',
      },
      {
        result: 'SRT-7.34 -- Draft -> Under Review... testing passed',
        image: 'SRT-7.34_UnderReview.png',
      },
    ];
    createDoc('test', 'SRT-7 Generic Workflow', results)
    console.log('test passed');
  }

})();

