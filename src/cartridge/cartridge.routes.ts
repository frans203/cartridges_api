import express from "express";
import {
  getCartridges,
  getCartridge,
  createCartridge,
  deleteCartridge,
  updateCartridge,
  filterCartridgesByPrice,
  filterCartridgesByName,
  filterCartridgesMadeInMari,
  filterCartridgesLessThan5,
  filterCartridgesByConsole,
} from "./cartridge.controller";

const router = express.Router();

router.get("/", getCartridges);
router.get("/filter/price", filterCartridgesByPrice);
router.get("/filter/name", filterCartridgesByName);
router.get("/filter/mari", filterCartridgesMadeInMari);
router.get("/filter/less-than-5", filterCartridgesLessThan5);
router.get("/filter/console", filterCartridgesByConsole);
router.get("/:id", getCartridge);
router.post("/", createCartridge);
router.delete("/:id", deleteCartridge);
router.patch("/:id", updateCartridge);

export default router;
