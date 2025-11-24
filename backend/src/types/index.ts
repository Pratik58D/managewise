import type { Document, Types } from "mongoose";

export interface IUser extends Document{
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
  resetPasswordToken? : string | null;
  resetPasswordExpires? : Date | null;
}


export interface IProduct extends Document  {
  name: string;
  sku: string;
  category: Types.ObjectId;
  price: number;
  quantity: number;
  description?: string;
}

export interface ICategory extends Document{
  name: string;
  createdAt: Date;
}


export interface IStockHistory extends Document {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  change: number;
  note?: string;
  createdAt: Date;
}