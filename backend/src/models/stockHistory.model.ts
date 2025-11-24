import mongoose, { mongo, Schema } from "mongoose";
import type { IStockHistory } from "../types/index.js";


const StockHistorySchema: Schema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    change: {
      type: Number,
      required: true
    },
    note: {
      type: String
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IStockHistory>("StockHistory", StockHistorySchema);
