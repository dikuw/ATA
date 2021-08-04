// const { SRT71, SRT72 } = require('../tests/index');

const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');

exports.testRunner = async (req, res) => {
  let response = [];
  const request = req.body.itemPrefix
  for (const item of request) {
    try {
      await SRT72(item);
    } catch (err) {
      response.push({
        item: item,
        error: err,
      });
    }
  }
  //  //  This runs tests in parallel
  // await request.forEach(async (item) => {
  //   try {
  //     await SRT72(item);
  //   } catch (err) {
  //     response.push({
  //       item: item,
  //       error: err,
  //     });
  //   }
  // });
  return res.json({ success: response });
}