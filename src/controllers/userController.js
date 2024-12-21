const User=require('../models/User.js');
const jwt=require('jsonwebtoken');

const generateToken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};

const registerUser=async(req,res) =>{
    const {name,email,password}=req.body;

    try {
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:'E-posta zaten kayıtlı.'});
        }

        const user=await User.create({
            name,
            email,
            password,
        });

        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }else{
            res.status(400).json({message:'Geçersiz kullanıcı verileri.'});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const loginUser=async(req,res)=> {
    const{email,password}=req.body;

    try{
        const user=await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }else{
            res.status(401).json({message:'Geçersiz e-posta veya şifre'});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getUserProfile=async(req,res)=>{
    const user =req.user;
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(404).json({message:'Kullanıcı bulunamadı.'});
    }
};

module.exports={registerUser,loginUser,getUserProfile};