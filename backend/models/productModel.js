const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true, "Please Enter product Description"]
    },
    price:{
        type:String,
        required:[true, "Please Enter product Price"],
        maxLength:[8, "Price cannot exceed 8 characters"]
    },
    rating: {
        type:String,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please Enter product Category"]
    },
    stock:{
        type:Number,
        required:[true, "Please Enter product Category"],
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            reating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Product", productSchema);