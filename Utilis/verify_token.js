import jwt from 'jsonwebtoken';
import { createErr  } from './error.js';

export const verify_token = (req,res,next) => {
    console.log('jwt - user verified');
    const token = req.cookies.access_token;
    
    if(!token) return next(createErr(401,'You are not authenticate'));

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createErr(401,'You are not authenticate'));
        req.user = user;
        console.log(user);
        next();
    });
};

export const testKar = (req,res,next) => {
    console.log('test kar called');
    next();
};


