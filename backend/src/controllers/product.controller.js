import { error } from "winston";
import prisma from "../utils/client";

export const getAllProduct = async (req, res, next) => {
    try {
        const data = await prisma.product.findMany();
        if(!data) {
            return res.status(404).json({
                error: "data not found",
                message: "field",
                data: null,
            })
        }
        res.status(200).json({
            error: null,
            message: "success",
            data,
        });
    } catch (error) {
        next(
            new Error(
                "Error in src/controllers/product.controller.js: getAllProduct - " + 
                    error.message
            )
        )
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await prisma.product.findUnique({
            where: {
                id: Number(id),
            },
        });
        if(!data) {
            return res.status(404).json({
                error: "data not found",
                message: "field",
                data: null,
            })
        }
        res.status(200).json({
            error: null,
            message: "success",
            data,
        });
    } catch (error) {
        next(
            new Error(
                "Error in src/controllers/product.controller.js: getProductById - " +
                error.message
            )
        );
    }
}

export const createProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(
            new Error(
                "Error in src/controllers/product.controller.js: createProduct - " +
                error.message
            )
        );
    }
}
                           