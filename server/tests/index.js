const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');
const { SRT73 } = require('../tests/SRT-7-3_nullifications');
const { SRT74 } = require('../tests/SRT-7-4_retirement_w_CO');

exports.Handler = {
  SRT71,
  SRT72,
  SRT73,
  SRT74,
};