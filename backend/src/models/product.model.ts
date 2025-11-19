import mongoose, { Schema} from "mongoose";
import type { IProduct } from "../types/index.js";

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true , ref: "Category" },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
