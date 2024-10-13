import express from "express";
import { checkLogin } from "../Utils/jwt.js";
import { clearCart, getCart, updateCart } from "../Controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.get('/get',checkLogin,getCart);
cartRouter.post('/update',checkLogin,updateCart);
cartRouter.post('/delete',checkLogin,clearCart);

export default cartRouter;