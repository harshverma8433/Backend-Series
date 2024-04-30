import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // it is a bearer token means who bear this we consider it correct means token jiske paas h jo bhi  bhejega ussko data bhej diya jayega

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        index:true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true, "password is required"]
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
}

)

// it is a middleware functin to be executed just before saving a user document
userSchema.pre("save" , async function(next){
    if(!this.isModified("password"))   return next();
    this.password = bcrypt.hash(this.password , 10); // 10 which is the cost factor which determine the complexity of the hashing process
    next();

})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    })
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id:this._id,
    })
    process.env.REGRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REGRESH_TOKEN_EXPIRY
    }
}

export const User = mongoose.model("User", userSchema)