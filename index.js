import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/authRoute.js";
import todoRoute from "./Routes/todoRoute.js";

const app = express();
dotenv.config();

const connect_db = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Mongo DB connection Success');
    } catch (error) {
        console.log('Something Went Wrong on connection');
    }
}

// mongoose.connection.on('connected',()=>{
//     console.log('Connection Again');
// });

mongoose.connection.on('disconnected',()=>{
    console.log('Connection Disconnected');
});

app.listen(7000, ()=>{
    console.log('Connection success at port: 7000');
    connect_db();
});
app.use(cookieParser());
app.use(express.json());

// app.use((req,res,next)=>{
//     console.log('Middle War Called 90');
//     return res.status('500').json('Hello error from middle');
// });

// test


app.use('/api/user',userRoute);
app.use('/api/todo',todoRoute);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something Went Wrong';
    return res.status(status).json({
        success : false,
        status : status,
        message : message,
        stack: err.stack
    });
});