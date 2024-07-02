import express from "express";
import {
  addRestaurants,
  getRestaurants,
} from "../Controllers/restaurantsController.js";

const router = express.Router();

router.post("/add", addRestaurants);
router.get("/getRestaurants/:id", getRestaurants);

export default router;
