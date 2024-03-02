import express from "express";
import {
  getCartridges,
  getCartridge,
  createCartridge,
  deleteCartridge,
  updateCartridge,
} from "./cartridge.controller";

const router = express.Router();

router.get("/", getCartridges);
router.get("/:id", getCartridge);
router.post("/", createCartridge);
router.delete("/:id", deleteCartridge);
router.patch("/:id", updateCartridge);

export default router;
