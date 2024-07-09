import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        default:0
    }
},{timestamps:true})

const urlModel = mongoose.model('urlModel',urlSchema);

export default urlModel;