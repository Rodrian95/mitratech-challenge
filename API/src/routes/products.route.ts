import express from "express";
import * as productsController from "../controllers/products.controller";

const router = express.Router();

router.get("/products", productsController.getAllProducts);
router.get("/products/:name", productsController.getProductByName);
router.post("/products", productsController.createProduct);
router.put("/products/:id", productsController.updateProduct);
router.delete("/products/:id", productsController.deleteProduct);

export default router;
