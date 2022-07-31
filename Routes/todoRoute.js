import express from "express";
import { registerUser,loginUser } from "../Controllers/AuthController.js";
import { verify_token,testKar } from "../Utilis/verify_token.js";

const router = express.Router();

router.post('/',[verify_token,testKar],(req,res,next)=>{
    console.log('yesss');
    return res.json('hi');
});


export default router;