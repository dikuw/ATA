const express = require('express');
const router = express.Router();

const aboutController = require('./controllers/aboutController');

//  TODO: create controller exports
router.post('/message', aboutController.createMessage);

module.exports = router;