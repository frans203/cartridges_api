import { Request, Response } from "express";
import express from "express";
import cartRoutes from "./src/cartridge/cartridge.routes";
import userRoutes from "./src/user/user.routes";
import purchaseRoutes from "./src/purchase/purchase.routes";

const app = express();
const port = 3033;
const initialRoutePattern = "/api/v1";

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

app.use(`${initialRoutePattern}/cartridges`, cartRoutes);
app.use(`${initialRoutePattern}/user`, userRoutes);
app.use(`${initialRoutePattern}/purchases`, purchaseRoutes);

app.listen(port, () => console.log("app listening on port " + port));
