import type { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import stockHistoryModel from "../models/stockHistory.model.js";

class StockHistoryController {

    // create stock History
    createStockHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId, change, note } = req.body;

            if (!req.user) {
                throw new AppError("Authentication required", 401);
            }

            const userId = req.user.id;
            
            const product = await productModel.findById(productId);
            if (!product) throw new AppError("Product not found", 404);

            // update Product quantity
            product.quantity += change;
            await product.save();

            const history = await stockHistoryModel.create({
                productId,
                userId,
                change,
                note
            });

            return res.status(201).json({
                success: true,
                message: "Stock history created",
                data: history
            })

        } catch (error) {
            next(error)
        }

    }


    // read all stock histories

    getStockHistories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId, userId } = req.query;

            const filter: any = {};

            if (productId) filter.productId = productId;
            if (userId) filter.userId = userId;

            const histories = await stockHistoryModel
                .find(filter)
                .populate("productId", "name sku")
                .populate("userId", "name email")
                .sort({ createdAt: -1 });

            return res.json({
                success: true,
                count: histories.length,
                data: histories
            })
        } catch (error) {
            next(error);
        }

    }

    // read single stock History
    getSingleStockHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const history = await stockHistoryModel.findById(req.params.id)
                .populate("productId", "name sku")
                .populate("userId", "name email")

            if (!history) throw new AppError("History not found", 404);

            return res.json({
                success: true,
                data: history
            });
        } catch (error) {
            next(error)
        }
    }

    // update the stock
    updateStockHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { change, note } = req.body;

            if (!change && !note) throw new AppError("fill the field properly", 400)

            const updated = await stockHistoryModel.findByIdAndUpdate(
                req.params.id,
                { change, note },
                { new: true, runValidators: true }
            );

            if (!updated) throw new AppError("History not found", 404);

            return res.json({
                success: true,
                message: "Updated successfully",
                data: updated
            });

        } catch (error) {
            next(error);
        }

    }


    // delete the stockhistory

    deleteStockHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleted = await stockHistoryModel.findByIdAndDelete(req.params.id);
            if (!deleted) throw new AppError("History not found", 404);

            return res.json({
                sucess: true,
                message: "Deleted Successfully"
            })

        } catch (error) {
            next(error);
        }
    }







}


export default new StockHistoryController();