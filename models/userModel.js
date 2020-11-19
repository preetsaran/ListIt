const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({     

    name: {type:String,required:[true,"Name is required field"]},
    email:  {type:String,required:[true,"Email is required field"],unique:true},
    password: { type: String, required: [true, "password is required field"] },
    date: { type: Date, default:Date.now },
})

const userModel = mongoose.model("user", userSchema);

module.exports=userModel;