import express from "express";
import { addTodo , getTodos , updateTodo, deleteTodo, deleteAllTodo } from "../Controllers/TodoController.js";
import { verify_user,isAllowForTodo } from "../Utilis/verify_token.js";

const router = express.Router();

router.post('/',[verify_user],addTodo);
router.put('/:id',[isAllowForTodo],updateTodo);
router.get('/',[verify_user],getTodos);
router.delete('/:id',[isAllowForTodo],deleteTodo);
router.delete('/',[verify_user],deleteAllTodo);


export default router;