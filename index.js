import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/authRoute.js";

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
app.use(express.json());
app.use('/api/user',userRoute);
