export interface IUser{
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
}


export interface IProduct  {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}