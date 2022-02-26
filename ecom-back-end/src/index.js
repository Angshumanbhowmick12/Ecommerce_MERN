const express = require('express');
const env = require('dotenv');
const app = express();

const mongoose =require('mongoose');
const path=require('path')
const cors =require('cors')

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const catergoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')

// environment variable or you ca say constants
env.config();

// mongodb connection
mongoose.connect(
   'mongodb+srv://user:admin@cluster0.wlssv.mongodb.net/mernstack?retryWrites=true&w=majority' ,
    {useNewUrlParser:true, useUnifiedTopology:true,}
).then(()=>{
    console.log('Database connected');
});
app.use(cors())
app.use(express.json());
//app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true })); 
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',catergoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`Server is runing on port ${process.env.PORT}`);
});
