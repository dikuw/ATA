const express = require('express');
const router = express.Router();

const aboutController = require('./controllers/aboutController');
const dataController = require('./controllers/dataController');
const testController = require('./controllers/testController');

router.get('/getItemTypes', dataController.getItemTypes);
router.get('/getTestFunctions', dataController.getTestFunctions);

router.post('/testRunner', testController.testRunner);

module.exports = router;