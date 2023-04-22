const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology:true,

    }).then((data) => {
        console.log(`MongoDB Connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase;