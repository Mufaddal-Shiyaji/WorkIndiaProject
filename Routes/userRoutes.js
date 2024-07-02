import express from "express";
import {
  getUsers,
  createUsers,
  loginUsers,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/getUsers/:id", getUsers);

export default router;
