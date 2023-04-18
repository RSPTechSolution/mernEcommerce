const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../meddleware/catchAsyncError');
const User = require('../models/userModel');

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
    const token = User.getJWTToken();
    res.status(200).json({
        success: true,
        token,
    })
});