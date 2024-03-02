import { Request, Response } from "express";
import express from "express";
import cartRoutes from "./src/cartridge/cartridge.routes";

const app = express();
const port = 3033;
const initialRoutePattern = "/api/v1";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(`${initialRoutePattern}/cartridges`, cartRoutes);

app.listen(port, () => console.log("app listening on port " + port));
