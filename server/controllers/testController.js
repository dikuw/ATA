// const { SRT71, SRT72 } = require('../tests/index');

const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');

exports.testRunner = async (req, res) => {
  await SRT71("POL");
  return res.json({ success: true });
}