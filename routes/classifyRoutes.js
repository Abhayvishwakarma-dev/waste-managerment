const express = require('express');
const { classifyItem } = require('../controllers/classifyController');
const router = express.Router();

router.post('/', classifyItem);

module.exports = router;