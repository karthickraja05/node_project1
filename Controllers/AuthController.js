import User from "../Models/UserModel.js";
import { createErr } from "../Utilis/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res,next)=>{
    try {
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        // const userData = new User(req.body);
        const userData = new User({
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashPassword,
        });
        // userData.password = hashPassword;
        await userData.save();
        res.status(200).json({
            status : 200,
            message: 'User Created Sucessfully'
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req,res,next)=>{
    // return next(createErr('500','Something Went Wrong'));
    
    try {
        const userData = await User.findOne({
            user_name : req.body.user_name,
        });

        if(!userData){
            return next(createErr(400,'User Not found'))
        }
        
        const passwordVerify = await bcrypt.compareSync(req.body.password, userData.password);
        if(!passwordVerify){
            return next(createErr(400,'Invalid Password'))
        }
        // console.log(userData);
        const token = jwt.sign({
            unique_id: userData._id,
            isAdmin: userData.isAdmin,
        },process.env.JWT);
        
        return res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({
            status_code: 1,
            message: 'Success Response'
        });
        
    } catch (error) {
        next(error);
    }
};