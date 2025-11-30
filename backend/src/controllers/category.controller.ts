import type { Request, Response, NextFunction } from "express";
import Category from "../models/category.model.js";
import { AppError } from "../utils/AppError.js"



class CategoryController {
    // create category
    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            if (!name) throw new AppError("Category name is required", 400);

            const exist = await Category.findOne({ name });
            if (exist) throw new AppError("Category already exists", 409);

            const category = await Category.create({ name, description });
            return res.status(201).json({
                success: true,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all categories

    getAllCategories = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const categories = await Category.find();
            return res.json({ success: true, data: categories });

        } catch (error) {
            next(error);
        }
    }

    // Get category by ID
    getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            if (!category) throw new AppError("Category not found", 404);

            return res.json({ success: true, data: category });
        } catch (error) {
            next(error);
        }
    };

    //update category

    updateCategory = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const { id } = req.params;
            if (!id) throw new AppError("Category not found", 404);

            const { name, description } = req.body;

            const category = await Category.findByIdAndUpdate(
                id,
                {name , description},
                {new : true , runValidators : true}
            )
            if (!category) throw new AppError("Category not found", 404);
            return res.json({ success: true, data: category });
        } catch (error) {
            next(error)
        }

    }

    // delete category

    deleteCategory = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const { id } = req.params;
            if (!id) throw new AppError("Category not found", 404);
             const category = await Category.findByIdAndDelete(id);
            if (!category) throw new AppError("Category not found", 404);
             return res.json({ success: true, message: "Category deleted successfully" });
        } catch (error) {
            next(error);
        }

    }


}



export default new CategoryController();