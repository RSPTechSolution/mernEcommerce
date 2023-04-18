const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Interval Server Error";

    //wrong Mongo Id error

    if(err.name == 'CastError'){
        const message = `Resource Not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        error: err.message,
    });
}