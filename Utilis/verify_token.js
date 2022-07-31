import jwt from 'jsonwebtoken';
import { createErr  } from './error.js';
import User from "../Models/UserModel.js";
import Todo from "../Models/TodoModel.js";

export const verify_token = (req,res,next) => {
    
    const token = req.cookies.access_token;
    
    if(!token) return next(createErr(401,'You are not authenticate'));

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createErr(401,'You are not authenticate'));
        req.user = user;
        return next();
    });
};

export const testKar = (req,res,next) => {
    console.log('test kar called');
    next();
};

export const verify_user = (req,res,next) => {
    verify_token(req,res, async ()=>{
        console.log(req.user.unique_id);
        if(!(req.user && req.user.unique_id)) return next(createErr(401,'You are not authenticate'));

        const userData = await User.findById(req.user.unique_id);
        if(!userData) next(createErr(401,'You are not authenticate'));
        console.log('Suceess Verify Token');
        return next();    
    });
};

export const isAllowForTodo = (req,res,next) =>{
    verify_user(req,res, async ()=>{
        try {
            const todo = await Todo.findById(req.params.id);
            if(!todo._id) return next(createErr(401,'Invalid Todo Id'));
            
            if(todo.user_id != req.user.unique_id) return next(createErr(401,'You are not authenticate'));
            return next();    
        } catch (error) {
            return next(error);
            
        }
        
    })
}


