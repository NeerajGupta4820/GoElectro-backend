import express from "express";
import { allUsers, createUser, loginUser } from "../Controllers/userController.js";
import { checkAdmin } from "../Utils/jwt.js";
const userRouter = express.Router();

userRouter.post('/signup',createUser);
userRouter.post('/login',loginUser);
userRouter.get('/allUsers',checkAdmin,allUsers);

export default userRouter;
