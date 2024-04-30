import dotenv from "dotenv";

dotenv.config({path:'./.env'})

import express from "express";

import mongoose from "mongoose";

import {DB_NAME} from "./constants.js"

import connectDB from "./db/index.js"
import app from "./app.js"



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("Server running at", process.env.PORT);
    })
})
.catch(error=>{
    console.log("mongodb connection failed",error);
})