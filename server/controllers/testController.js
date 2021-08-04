// const { SRT71, SRT72 } = require('../tests/index');

const { SRT71 } = require('../tests/SRT-7-1_normal_w_CO');
const { SRT72 } = require('../tests/SRT-7-2_normal_wo_CO');
const { SRT73 } = require('../tests/SRT-7-3_nullifications');
const { SRT74 } = require('../tests/SRT-7-4_retirement_w_CO');

exports.testRunner = async (req, res) => {
  let response = [];
  const items = req.body.itemPrefix;
  const [ test ] = req.body.testFunction;
  for (const item of items) {
    try {
      switch(test) {
        case "SRT71":
          await SRT71(item);
          break;
        case "SRT72":
          await SRT72(item);
          break;
        case "SRT73":
          await SRT73(item);
          break;
        case "SRT74":
          await SRT74(item);
          break;
        default:
      }
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