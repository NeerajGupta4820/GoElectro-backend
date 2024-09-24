import express from "express";
import userRouter from "./Routes/userRoutes";
import productRouter from "./Routes/productRoutes";
const app = express();


app.use(express.json());

// Routes
app.use('/api/user',userRouter);
app.use('/api',productRouter);

export default app;