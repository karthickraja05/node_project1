import Todo from "../Models/TodoModel.js";
import { createSuccess } from "../Utilis/error.js";

export const addTodo = async (req,res,next)=>{
    // console.log(req.user.unique_id);
    try {
        const todoData = new Todo({
            title: req.body.name,
            desc: req.body.content ?? '',
            status: req.body.status ?? true,
            user_id : req.user.unique_id,
        });
        // console.log(todoData);
        await todoData.save();
        // return res.status(200).json('yes');
        return res.status(200).json(createSuccess(200,'Todo Added Successfully'));
    } catch (error) {
        return next(error);
    }
}

export const getTodos = async (req,res,next)=>{
    // console.log(req.user.unique_id);
    try {
        const todoDatas = await Todo.find({ user_id: req.user.unique_id});
        console.log(todoDatas);
        
        // return res.status(200).json('yes');
        const data = createSuccess(200,'Success');
        data.todo_list = todoDatas;
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
}

export const updateTodo = async (req,res,next)=>{
    try {
        const req_data = {};
        if(req.body.hasOwnProperty('name')) req_data.title = req.body.name;
        if(req.body.hasOwnProperty('content')) req_data.desc = req.body.content;
        if(req.body.hasOwnProperty('status')) req_data.status = req.body.status;

        const todoDatas = await Todo.findByIdAndUpdate(req.params.id,req_data,{new: true});
        
        const data = createSuccess(200,'Success');
        data.todo_list = todoDatas;
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
}

export const deleteTodo = async (req,res,next)=>{
    try {
        
        await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).json(createSuccess(200,'Deleted Successfully'));

    } catch (error) {
        return next(error);
    }
}

export const deleteAllTodo = async (req,res,next)=>{
    try {
        
        await Todo.deleteMany({user_id: req.user.unique_id});
        return res.status(200).json(createSuccess(200,'All Todos Deleted Successfully'));

    } catch (error) {
        return next(error);
    }
}