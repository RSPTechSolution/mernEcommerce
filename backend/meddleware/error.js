const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Interval Server Error";

    //wrong Mongo Id error

    if(err.name == 'CastError'){
        const message = `Resource Not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Email Duplicate Err
    if(err.code ===  11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong jsonWebToken Error
    if(err.code ===  'jsonWebTokenError'){
        const message = `Json Web Token is invalid, Please try again`;
        err = new ErrorHandler(message, 400);
    }    

    //JWT Expire err
    if(err.code ===  'TokenExpiredError'){
        const message = `Json Web Token is Expired, Please try again`;
        err = new ErrorHandler(message, 400);
    }  

    res.status(err.statusCode).json({
        success:false,
        error: err.message,
    });
}