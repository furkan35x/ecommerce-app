const express=require('express');
const helmet=require('helmet');
const morgan=require('morgan');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes.js');
const productRoutes=require('./routes/productRoutes.js');
const orderRoutes=require('./routes/orderRoutes.js');

const app=express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.status(200).json({message:'API is working!'});
});

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);


module.exports=app;