import { Request, Response } from "express";
import { Product } from "../models/product.model";
import * as productService from "../services/products.service";
import { ProductErrors } from "../utils";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: Product[] = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error while getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const name: string = req.params.name;
  try {
    const product: Product | null = await productService.getProductById(name);
    if (!product) {
      res.status(404).json({ error: ProductErrors.productNotFound });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error("Error while getting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newProduct: Product = req.body;
  try {
    await productService.createProduct(newProduct);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error: any) {
    console.error("Error while creating product:", error);
    if (error.message === ProductErrors.duplicatedName) {
      res.status(409).json({ message: ProductErrors.duplicatedName });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id;
  const updatedProduct: Product = req.body;
  try {
    await productService.updateProduct(id, updatedProduct);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id;
  try {
    await productService.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error while deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
