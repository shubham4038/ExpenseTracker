const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const groupRoutes = require('./routes/groupRoute');
const app = express();


app.use(express.json());
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/expense',expenseRoutes);
app.use('/api/v1/group',groupRoutes);

module.exports = app;