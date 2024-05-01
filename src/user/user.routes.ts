import express from "express";
import {
  createUser,
  deleteUser,
  getPurchasesFromUser,
  getUser,
  getUsers,
  loginUser,
} from "./user.controller";

const router = express.Router();

router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/purchases/:id", getPurchasesFromUser);

export default router;
