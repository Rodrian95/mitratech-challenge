import { QueryResult } from "pg";
import { Product } from "../models/product.model";
import { pool } from "../database/database";
import { ProductErrors, DBErrorCodes } from "../utils";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { rows }: QueryResult<Product> = await pool.query(
      "SELECT * FROM products"
    );
    return rows;
  } catch (error) {
    throw new Error(`Error while getting products: ${error}`);
  }
};

export const getProductById = async (name: string): Promise<Product | null> => {
  try {
    const { rows }: QueryResult<Product> = await pool.query(
      "SELECT * FROM products WHERE name = $1",
      [name]
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`Error while getting product ${name}: ${error}`);
  }
};

export const createProduct = async (newProduct: Product): Promise<void> => {
  const { name, price, description } = newProduct;
  try {
    await pool.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3)",
      [name, price, description]
    );
  } catch (error: any) {
    if (error.code === DBErrorCodes.duplicatedKey) {
      throw new Error(ProductErrors.duplicatedName);
    }
    throw new Error(`Error while creating product: ${error}`);
  }
};

export const updateProduct = async (
  id: string,
  updatedProduct: Product
): Promise<void> => {
  const { name, price, description } = updatedProduct;
  try {
    const response = await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4",
      [name, price, description, id]
    );
    if (response.rowCount === 0) {
      throw new Error(ProductErrors.productNotFound);
    }
  } catch (error) {
    throw new Error(`Error while updating product: ${error}`);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await pool.query("DELETE FROM products WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0) {
      throw new Error(ProductErrors.productNotFound);
    }
  } catch (error) {
    throw new Error(`Error while deleting product: ${error}`);
  }
};
