class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
        // console.log(`message: ${message},,, StatusCode: ${statusCode}`)
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler