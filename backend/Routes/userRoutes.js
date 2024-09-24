import express from "express";
import { createUser, loginUser } from "../Controllers/userController";
const userRouter = express.Router();

userRouter.post('/signup',createUser);
userRouter.post('/login',loginUser);

export default userRouter;
