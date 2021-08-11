const { Handler } = require('../tests/index');

exports.testRunner = async (req, res) => {
  const item = req.body.itemPrefix;
  const [ test ] = req.body.testFunction;

  let successMessage = await Handler[test](item);
  return res.json({ result: successMessage });

  // try {
  //   let successMessage = await Handler[test](item);
  //   return res.json({ result: successMessage });
  // } catch (err) {
  //   return res.json({ result: err.name });
  // }
  
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
  
}