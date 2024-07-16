import prisma from "../utils/client.js";
import { inputProductValidation } from "../validations/product.validation.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await prisma.product.findMany();
    if (!data) {
      return res.status(404).json({
        error: "data not found",
        message: "field",
        data: null,
      });
    }
    res.status(200).json({
      error: null,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
        message: "The provided ID is not a number",
        data: null,
      });
    }

    const data = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res.status(404).json({
        error: "Data not found",
        message: "The product with the specified ID does not exist",
        data: null,
      });
    }

    res.status(200).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = inputProductValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "field",
        data: null,
      });
    }
    const data = await prisma.product.create({
      data: {
        name: value.name,
        qty: value.qty,
        Price: value.price,
      },
    });
    res.status(200).json({
      error: null,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = inputProductValidation(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "Invalid input data",
        data: null,
      });
    }

    // Cek apakah produk dengan ID yang diberikan ada dalam database
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
        message: "Product with the given ID does not exist",
        data: null,
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: value.name,
        qty: value.qty,
        Price: value.price, // Pastikan Price sesuai dengan yang didefinisikan dalam skema Prisma
      },
    });

    res.status(200).json({
      error: null,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      error: null,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
