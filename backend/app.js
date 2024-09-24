import express from "express";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
const app = express();


app.use(express.json());

// Routes
app.use('/api/user',userRouter);
app.use('/api',productRouter);

export default app;