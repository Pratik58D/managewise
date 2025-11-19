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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
