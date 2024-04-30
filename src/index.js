import dotenv from "dotenv";

dotenv.config({path:'./.env'})

import express from "express";

import mongoose from "mongoose";

import {DB_NAME} from "./constants.js"

import connectDB from "./db/index.js"

const app = express();


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4444 , ()=>{
        console.log("Server running at", process.env.PORT);
    })
})
.catch(error=>{
    console.log("mongodb connection failed",error);
})