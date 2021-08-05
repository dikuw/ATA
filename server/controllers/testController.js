const { Handler } = require('../tests/index');

exports.testRunner = async (req, res) => {
  const items = req.body.itemPrefix;
  const [ test ] = req.body.testFunction;
  
  let response = [];
  
  for (const item of items) {
    try {
      await Handler[test](item);
    } catch (err) {
      console.log(err);
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