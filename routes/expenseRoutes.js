const express = require('express');
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/createExpense').post(userController.protect,expenseController.create);
router.route('/getExpense/:id').get(expenseController.get);
router.route('/destroyExpense/:id').delete(expenseController.destroy);
router.route('/updateExpense/:id').patch(expenseController.update);

module.exports = router;