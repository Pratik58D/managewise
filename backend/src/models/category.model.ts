import mongoose, { Schema, Document } from "mongoose";
import type { ICategory } from "../types/index.js";



const CategorySchema: Schema = new Schema({
    name:{ 
        type: String, 
        required: true,
         unique: true 
        },
  },
  { timestamps: {
     createdAt: true, 
     updatedAt: false 
    }}
);

export default mongoose.model<ICategory>("Category", CategorySchema);
