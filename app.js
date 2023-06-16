const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();


app.use(express.json());
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/expense',expenseRoutes);

module.exports = app;