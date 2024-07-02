import express from "express";
import {
  addRestaurants,
  getRestaurants,
  bookSlot,
} from "../Controllers/restaurantsController.js";

const router = express.Router();

router.post("/add", addRestaurants);
router.get("/getRestaurants/:id", getRestaurants);
router.post("/bookSlot", bookSlot);

export default router;
