import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  updateRestaurant,
  getRestaurant,
  createReview,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Fetch all restaurants
// Method GET /api/restaurants
router.get("/", getAllRestaurants);

// Fetch Details of single restaurant
// Method GET /api/restaurants/:id
router.get("/:id", getRestaurant);

// Update a single restaurant
// Method PUT /api/restaurants/:id
router.put("/:id", updateRestaurant);

// Delete a single restaurant
// Method DELETE /api/restaurants/:id
router.delete("/:id", deleteRestaurant);

// Create a single restaurant
// Method POST /api/restaurants
router.post("/", createRestaurant);


// Create review of single restaurant
// Method POST /api/restaurants/:id/addReview
router.post("/:id/addReview", createReview);

export default router;
