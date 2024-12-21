const app=require('./app');
const dotenv=require('dotenv');
const connectDB =require('./config/db.js');

dotenv.config();
connectDB();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`);
});