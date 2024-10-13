import express from "express";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import cors from "cors"
import cartRouter from "./Routes/cartRoutes.js";
const app = express();

app.use(cors());
  

app.use(express.json());

// Routes
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRoutes);
app.use('/api/cart',cartRouter);

export default app;