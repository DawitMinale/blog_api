const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {StatusCodes}=require('http-status-codes')
const { BadRequest } = require('../errors');
const asyncHandler = require('express-async-handler');




const register=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({email})
    if(user){
        // res.status(StatusCodes.BAD_REQUEST)
        throw new BadRequest('user already exists')
    }
    const newUser=await User.create({name,email,password})
    await newUser.save()
    const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(StatusCodes.CREATED).json({user:{name},token})
    
})


const login=asyncHandler(async (req,res)=>{

    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequest('Please provide email and password')
    }
    const user=await User.findOne({email})
    if(!user){
        throw new BadRequest('Invalid credentials')
    }
    const isMatch=await user.matchPasswords(password)
    if(!isMatch){
        throw new BadRequest('Invalid credentials')
    }
   
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(StatusCodes.OK).json({user:{email},token})

})

module.exports={register,login}