import mongoose from "mongoose";
import { email, string } from "zod";

const formSchema = new mongoose.Schema({
  name : String,
  email : String,
  subject : String,
  message : String
},{timestamps : true})


export const FormModel = mongoose.model('Form' , formSchema);