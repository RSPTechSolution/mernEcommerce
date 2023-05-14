const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../meddleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');


//create product controller
exports.createProduct = catchAsyncError(async(req,res) => {
    req.body.user = req.user.id;

    const newProduct = await Product.create(req.body);

    res.status(201).json({
        success:true,
        newProduct
    });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(201).json({
        success:true,   
        products,
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
});

//Created New Review or update the review
exports.createProductReview = catchAsyncError(async(req,res,next) => {

    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    // console.log(product);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString());
    if(isReviewed){
        console.log("hello");
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                (rev.comment = comment);
            });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0
    product.ratings = product.reviews.forEach((rev) => {
        avg += Number(rev.rating)
        console.log(rev.rating);
    });
    console.log(avg);
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success: true
    });
});

//Get all review of a single product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product .reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating
    });

    let ratings = 0;

    if(reviews.length === 0){
        ratings = 0;
    }else{
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success:true,
    });
});