const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../meddleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

//Register a user
exports.registerUser = catchAsyncError(async(req,res,next) => {
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepicurl"
        },
    });

    sendToken(user,201,res);
});

//Login user
exports.loginUser = catchAsyncError (async (req,res,next) => {
    const {email,password} = req.body;
    //checking

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password", 400))
    }
    const user = await User.findOne({email}).select("password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }else{

    }
    sendToken(user,200,res);
});

//Logout user
exports.logout = catchAsyncError(async(req, res, next) => {

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})