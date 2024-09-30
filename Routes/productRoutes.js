import express from "express";
import { addProduct, deleteProduct, getAllProduct, getbyId, updateProduct } from "../Controllers/productController.js";
import { checkAdmin } from "../Utils/jwt.js";

const productRouter = express.Router();

productRouter.get('/allproducts',getAllProduct);
productRouter.get('/product/:id',getbyId);
productRouter.post('/addproduct',checkAdmin,addProduct);
productRouter.post('/deleteproduct/:id',checkAdmin,deleteProduct);
productRouter.post('/updateproduct/:id',checkAdmin,updateProduct);

export default productRouter;
