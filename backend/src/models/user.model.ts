import mongoose, { Schema, Document } from "mongoose";
import type { IUser } from "../types/index.js";

const UserSchema: Schema = new Schema(
  {
    name: {
         type: String, 
         required: true 
        },
    email: { 
        type: String,
         required: true, 
         unique: true
         },
    password: { 
        type: String,
        required: true },
    role: { 
        type: String, 
        enum: ["ADMIN", "STAFF"], 
        default: "STAFF"
     },
     resetPasswordToken :{
      type : String,
      default : null,
     },
     resetPasswordExpires :{
      type : Date,
      default : null
     }

  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
