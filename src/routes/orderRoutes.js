const express = require('express');
const {protect}=require('../middlewares/authMiddleware.js');
const{
    addOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
}=require('../controllers/orderController.js');


const router=express.Router();

router.post('/',protect,addOrder);
router.get('/myorders',protect,getMyOrders);
router.get('/:id',protect,getOrderById);
router.put('/:id/pay',protect,updateOrderToPaid);
router.put('/:id/deliver', protect, updateOrderToDelivered);

module.exports=router;