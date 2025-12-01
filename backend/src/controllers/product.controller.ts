import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError.js";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";


class ProductController {
    // create Product

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, sku, category, price, quantity, description } = req.body;

            if (!name || !sku || !category || !price) {
                throw new AppError("Name, SKU, category and price are required", 400);
            }
            // Check if SKU already exists
            const existSKU = await productModel.findOne({ sku });
            if (existSKU) throw new AppError("SKU already exists", 409);

            // Check if category exists
            const existCategory = await categoryModel.findById(category);
            if (!existCategory) throw new AppError("Category not found", 404);

            const product = await productModel.create({
                name,
                sku,
                category,
                price,
                quantity,
                description
            })
            return res.status(201).json({
                success: true,
                data: product
            });

        } catch (error) {
            next(error)
        }

    }

    // get all Products
    getAllProducts = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const products = await productModel.find().populate("category", "name");
            return res.json({
                success: true,
                data: products
            });
            
        } catch (error) {
            next(error)
        }
    }


    // Get product by id
    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const product = await productModel.findById(id).populate("category", "name");
            if (!product) throw new AppError("Product not found", 404);

            return res.json({
                success: true,
                data: product
            });

        } catch (error) {
            next(error);
        }
    };

     // Update Product
     updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name, sku, category, price, quantity, description } = req.body;
            if (category) {
                const existCategory = await categoryModel.findById(category);
                if (!existCategory) throw new AppError("Category not found", 404);
            }
             const product = await productModel.findByIdAndUpdate(
                id,
                { name, sku, category, price, quantity, description },
                { new: true, runValidators: true }
            );
            
            if (!product) throw new AppError("Product not found", 404);

            return res.json({
                success: true,
                data: product
            }); 
        } catch (error) {
            next(error)
        }
     }


      // Delete Product
      deleteProduct = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const { id } = req.params;
            const product = await productModel.findByIdAndDelete(id);
            if (!product) throw new AppError("Product not found", 404);
            return res.json({
                success: true,
                message: "Product deleted successfully"
            });
            
        } catch (error) {
            next(error);
        }

      }


}



export default new ProductController();