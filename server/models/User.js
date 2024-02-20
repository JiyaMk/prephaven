const mongoose=require("mongoose");

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    AppliedForms:{
        type:String,
        default:"",
    },
    Following:{
        type:String,
        default:"",
    },
    notifications:{
        type:String,
        default:"",
    },
    wishlist:{
        type:String,
        default:"",
    },
    coins:{
        type:String,
        default:"",
    },
    myArticles:{
        type:String,
        default:"",
    },
});

const UserModel=mongoose.model("User", User);

module.exports=UserModel; 