const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../meddleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const cloudinary = require('cloudinary');

//Register a user
exports.registerUser = catchAsyncError(async(req,res,next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    })

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
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
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // get reset password

    const resetToken = user.getResetPasswordToken();

    // await user.save({validateBeforeSave: false});
    await user.save({ validateBeforeSave: false });

    // console.log(user);

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email thenm please ignote it`;

    try{
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Successfully`
        })
    }catch{
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });

//Get user Details
exports.getUserDetails = catchAsyncError(async(req, res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//Update user Password
exports.updatePassword = catchAsyncError(async(req, res,next) => {
    const user = await User.findById(req.user.id).select("+password");
    
    // console.log(req.body.oldPassword);
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match with confirm password",400));
    }

    user.password = req.body.newPassword;

    await user.save(); 

    sendToken(user,200, res);
   
});

//Update user Profile
exports.updateProfile = catchAsyncError(async(req, res,next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })
   
});

//Get all users for admin
exports.getAllUsers = catchAsyncError(async(req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});

//Get single user for admin
exports.getSingleUser = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with this Id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();;
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
