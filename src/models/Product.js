const mongoose =require('mongoose');

const productSchema=mongoose.Schema(
     {
        name:{
            type:String,
            required:[true,'Ürün adı gereklidir'],
        },
        description:{
            type:String,
            required:[true,'Açıklama gereklidir'],
        },
        price:{
            type:Number,
            required:[true,'Fiyat gereklidir'],
        },
        countInStock:{
            type:Number,
            required:[true,'Stok miktarı gereklidir'],
            default:0,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
     },
     {
        timestamps:true,
     }
);

module.exports=mongoose.model('Product',productSchema);