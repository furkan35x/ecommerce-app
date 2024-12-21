const Order=require('../models/Order.js');

const addOrder=async(req,res)=>{
    const{orderItems,shippingAddress,paymentMethod,totalPrice}=req.body;

    if(orderItems && orderItems.length ===0){
        return res.status(400).json({message:'Sipariş öğeleri boş.'});
    }
    const order = new Order({
        user:req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    });
    const createdOrder=await order.save();
    res.status(201).json(createdOrder);
};

const getMyOrders=async(req,res)=>{
    const orders =await Order.find({user:req.user._id});
    res.json(orders);
};

const getOrderById=async(req,res) =>{
    const order =await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return res.status(404).json({message:'Sipariş bulunamadı'});
    }
    res.json(order);
};

const updateOrderToPaid=async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return res.status(404).json({message:'Sipariş bulunamadı'});
    }
    order.isPaid=true,
    order.paidAt=Date.now();
    order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address,
    };
    const updatedOrder=await order.save();
    res.json(updatedOrder);
};

const updateOrderToDelivered=async(req,res)=>{
    const order =await Order.findById(req.params.id);

    if(!order){
        return res.status(404).json({message:'Sipariş bulunamadı'});
    }
    order.isDelivered=true,
    order.deliveredAt=Date.now();

    const updatedOrder=await order.save();
    res.json(updatedOrder);
}

module.exports= {
    addOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
};