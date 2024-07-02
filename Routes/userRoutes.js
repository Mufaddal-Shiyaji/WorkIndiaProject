const express = require("express");
let {
  getUsers,
  createUsers,
  loginUsers,
} = require("../Controllers/userController.js");

const router = express.Router();

router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/getUsers/:id", getUsers);

export default router;
