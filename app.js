import express from "express";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import cors from "cors"
const app = express();

app.use(cors());
  

app.use(express.json());

// Routes
app.use('/api/user',userRouter);
app.use('/api',productRouter);
app.use('/api/category',categoryRoutes);

export default app;