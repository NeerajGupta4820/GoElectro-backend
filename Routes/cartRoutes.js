import express from "express";
import { checkLogin } from "../Utils/jwt.js";
import { addToCart, clearCart, getCart, updateCart } from "../Controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.post('/get',checkLogin,getCart);
cartRouter.post('/update',checkLogin,updateCart);
cartRouter.post('/delete',checkLogin,clearCart);
cartRouter.post('/delete',checkLogin,addToCart);

export default cartRouter;