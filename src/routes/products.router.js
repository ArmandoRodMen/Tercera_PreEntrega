import { Router } from "express";
import {
  findProductAggregation,
  findProductById,
  createProduct,
  deleteProduct
} from "../controllers/products.controller.js";
const router = Router();

router.get("/", findProductAggregation);
router.get("/:idProduct", findProductById);
router.post("/", createProduct);
router.delete("/:idProduct", deleteProduct);

export default router;