const { itemTypes } = require('../data/itemTypes'); 

exports.getItemTypes = (req, res) => {
  return res.json({ itemTypes });
}