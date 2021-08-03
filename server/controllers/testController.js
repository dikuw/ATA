// const { SRT71, SRT72 } = require('../tests/index');

const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');

exports.testRunner = async (req, res) => {
  try {
    await SRT72(req.body.itemPrefix);
  } catch (err) {
    console.log(err);
  }
  
  return res.json({ success: true });
}