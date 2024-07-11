import { Router } from "express";
import productRouter from "./product.route.js";
import { errorHandling, notFound } from "../controllers/error.controller.js";

const app = Router();
app.use("/api", productRouter);

app.use("*", errorHandling);
app.use("*", notFound);

export default app;
