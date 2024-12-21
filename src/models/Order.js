const mongoose=require('mongoose');

const orderSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        orderItems:[
            {
                name:{type:String,required:true},
                quantity:{type:Number,required:true},
                price:{type:Number,required:true},
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:'Product',
                },
            },
        ],
        shippingAddress:{
            address:{type:String,required:true},
            city:{type:String,required:true},
            postalCode:{type:String,required:true},
            county:{type:String,required:true},
        },
        paymentMethod:{
            type:String,
            required:true,
        },
        paymentResult:{
            id:{type:String},
            status:{type:String},
            update_time:{type:String},
            email_address:{type:String},
        },
        totalPrice:{
            type:Number,
            required:true,
        },
        isPaid:{
            type:Boolean,
            required:true,
            default:false,
        },
        paidAt:{
            type:Date,
        },
        isDelivered:{
            type:Boolean,
            required:true,
            default:false,
        },
        deliveredAt:{
            type:Date,
        },
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model('Order',orderSchema);