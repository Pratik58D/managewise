import mongoose, { Schema, Document } from "mongoose";


export interface IStockHistory extends Document {
  productId: string;
  userId: string;
  change: number;
  note?: string;
  createdAt: Date;
}

const StockHistorySchema: Schema = new Schema(
  {
    productId: { type: String, required: true, ref: "Product" },
    userId: { type: String, required: true, ref: "User" },
    change: { type: Number, required: true },
    note: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IStockHistory>("StockHistory", StockHistorySchema);
