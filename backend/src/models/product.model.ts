import mongoose, { Schema } from "mongoose";
import type { IProduct } from "../types/index.js";

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    //SKU = Stock Keeping Unit  -> It’s a unique code for each product.
    sku: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
