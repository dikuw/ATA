const { itemTypes } = require('../data/itemTypes'); 
const { testFunctions } = require('../data/testFunctions'); 

exports.getItemTypes = (req, res) => {
  return res.json({ itemTypes });
}

exports.getTestFunctions = (req, res) => {
  return res.json({ testFunctions });
}