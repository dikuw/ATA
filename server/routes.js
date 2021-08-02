const express = require('express');
const router = express.Router();

const aboutController = require('./controllers/aboutController');
const dataController = require('./controllers/dataController');

router.get('/getItemTypes', dataController.getItemTypes);

module.exports = router;