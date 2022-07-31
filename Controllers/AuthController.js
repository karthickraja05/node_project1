import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
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
        res.status(500).json({
            status_code: 500,
            message: error.message
        });
    }
};

export const loginUser = async (req,res)=>{
    try {
        const userData = await User.findOne({
            user_name : req.body.user_name,
        });

        if(!userData){
            return res.status(200).json({
                status_code: 0,
                message: 'User name not found'
            });
        }
        
        const passwordVerify = await bcrypt.compareSync(req.body.password, userData.password);
        if(!passwordVerify){
            return res.status(200).json({
                status_code: 0,
                message: 'Invalide Passwrod'
            });
        }
        // console.log(userData);
        const token = jwt.sign({
            unique_id: userData._id,
            isAdmin: userData.isAdmin,
        },process.env.JWT);
        
        // return res.status(200).json({
        //     status_code: 1,
        //     message: 'Success Response'
        // });

        return res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({
            status_code: 1,
            message: 'Success Response'
        });
        
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message
        });
    }
};