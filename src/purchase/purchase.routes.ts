import express from "express";
import {
  confirmPurchaseByAdmin,
  getAllNotConfirmedPurchases,
  getConfirmedPurchases,
  insertPurchase,
} from "./purchase.controller";

const router = express.Router();

router.get("/not-confirmed", getAllNotConfirmedPurchases);
router.get("/confirmed/:id", getConfirmedPurchases);
router.post("/", insertPurchase);
router.patch("/confirm-purchase", confirmPurchaseByAdmin);

export default router;
