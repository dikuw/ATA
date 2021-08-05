const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');
const { SRT73 } = require('../tests/SRT-7-3_nullifications');
const { SRT74 } = require('../tests/SRT-7-4_retirement_w_CO');
const { SRT75 } = require('../tests/SRT-7-5_retirement_wo_CO');
const { SRT76 } = require('../tests/SRT-7-6_retirement_nullifications');

exports.Handler = {
  SRT71,
  SRT72,
  SRT73,
  SRT74,
  SRT75,
  SRT76,
};