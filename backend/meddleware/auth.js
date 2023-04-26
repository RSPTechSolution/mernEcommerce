const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) => {
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET);
    
    req.user = await User.findById(decodeData.id);
    console.log(req.user);   

    next();
});

//
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // console.log(res);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};