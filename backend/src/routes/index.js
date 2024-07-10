import { Router } from "express";
import productRouter from "./product.route.js";

const app = Router();
app.use("/api", productRouter);

export default app;
