const { itemTypes } = require('../data/itemTypes');

exports.getItemType = (itemTypePrefix) => {
  return itemTypes.filter(itemType => {
    return itemType.itemPrefix === itemTypePrefix
  })
}