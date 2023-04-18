const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../meddleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');


//create product controller
exports.createProduct = catchAsyncError(async(req,res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        success:true,
        newProduct
    });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const allProducts = await apiFeature.query;
    res.status(201).json({
        success:true,   
        allProducts,
        productCount
    });
});

//update Product
exports.updateProduct = catchAsyncError(async(req,res) => {
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 505));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,   
        product
    });
});

//Delete product
exports.deleteProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,   
        message:"product Deleted successfuly"
    });
    
});

//Get product details
exports.getProductDetails = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success:true,   
        message:product
    })
})