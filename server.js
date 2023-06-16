const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

mongoose.connect('mongodb://localhost:27017/authSystem').then(()=>console.log('DB connected')).catch((err)=>err);

app.listen(3000,()=>{
    console.log('Listening to 3000');
})
