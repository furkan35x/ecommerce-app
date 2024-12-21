const jwt=require('jsonwebtoken');
const User=require('../models/User.js');

const protect=async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startWith('Bearer')
    ){
        try {
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({message:'Yetkilendirme başarısız,geçersiz token'});
        }
    }
    if(!token){
        res.status(401).json({message:'Token bulunamadı,yetkilendirme reddedildi.'});
    }
};

module.exports={protect};