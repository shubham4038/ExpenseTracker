const express = require('express');
const userController = require('../controllers/userController');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.route('/addGroup').post(userController.protect,groupController.addMembers);
router.route('/calculateexpense/:id').get(userController.protect,groupController.calculateExpense);


module.exports = router;