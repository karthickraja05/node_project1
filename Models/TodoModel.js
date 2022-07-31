
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    status:{
        type: Boolean,
        default: true
    }
  },{
    timestamps : true
  });

  export default mongoose.model('Todo',todoSchema);