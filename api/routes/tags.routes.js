const express = require('express');
const tagsControllers = require('../controllers/tags.controllers');
const router = express.Router(); 

router.get('/api/tags',tagsControllers.getAllTags);
router.post('/api/tag/add',tagsControllers.addNewTag);

module.exports = router