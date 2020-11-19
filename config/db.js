const mongoose = require("mongoose");
const config=require('config');
const DB = config.get('mongoURI');

const connectDB = async () => {

    try{
        await mongoose.connect(DB,{
            useNewUrlParser:true,
            useCreateIndex:true ,
            useUnifiedTopology: true ,
            useFindAndModify: false 
        })
        console.log("DB is connected");   
    }
    catch (error){
        console.log(error);   
    }
    
}


module.exports=connectDB;


