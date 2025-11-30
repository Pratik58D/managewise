import mongoose, { Schema, Document } from "mongoose";
import type { ICategory } from "../types/index.js";



const CategorySchema: Schema = new Schema({
    name:{ 
        type: String, 
        required: true,
         unique: true 
        },
    description: {
        type: String,
        default: "",
    },
  },
  { timestamps: true}
);

export default mongoose.model<ICategory>("Category", CategorySchema);
