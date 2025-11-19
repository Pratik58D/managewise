import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  createdAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
  
    name:{ 
        type: String, 
        required: true,
         unique: true 
        },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
