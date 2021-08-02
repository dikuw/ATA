// const { SRT71, SRT72 } = require('./index');
const { SRT71 } = require('./SRT-7-1_normal_w_CO');
const { SRT72 } = require('./SRT-7-2_normal_wo_CO');

(async () => {

  await Promise.all([SRT72("DRV")]);

})();