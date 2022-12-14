
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: [true, "must be unique"],
        required: [true,'is Required']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
    
  },{
    timestamps : true
  });

  export default mongoose.model('User',userSchema);