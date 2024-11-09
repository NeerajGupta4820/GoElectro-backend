import express from "express";
<<<<<<< HEAD
import { allUsers, createUser, googleLogin, loginUser, resetPassword, updateUser } from "../Controllers/userController.js";
=======
import { allUsers, createUser, loginUser, updateUser } from "../Controllers/userController.js";
>>>>>>> 157d137aa5c9604af668c4ab30334322bdc6df66
import { checkAdmin, checkLogin } from "../Utils/jwt.js";
const userRouter = express.Router();

userRouter.post('/signup',createUser);
userRouter.post('/login',loginUser);
<<<<<<< HEAD
userRouter.post('/google',googleLogin);
userRouter.post('/update',checkLogin,updateUser)
userRouter.get('/allUsers',checkAdmin,allUsers);
userRouter.post('/reset-password', resetPassword);
=======
userRouter.post('/update',checkLogin,updateUser)
userRouter.get('/allUsers',checkAdmin,allUsers);

>>>>>>> 157d137aa5c9604af668c4ab30334322bdc6df66
export default userRouter;
