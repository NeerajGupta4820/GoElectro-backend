import express from "express";
import { allUsers, createUser, loginUser, updateUser } from "../Controllers/userController.js";
import { checkAdmin, checkLogin } from "../Utils/jwt.js";
const userRouter = express.Router();

userRouter.post('/signup',createUser);
userRouter.post('/login',loginUser);
userRouter.post('/update',checkLogin,updateUser)
userRouter.get('/allUsers',checkAdmin,allUsers);

export default userRouter;
