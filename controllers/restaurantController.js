import asyncHandler from "express-async-handler";
import Restaurant from "../models/restaurantModel.js";
import Review from "../models/reviewModel.js";


//Fetch all restaurants
//Method GET /api/restaurants
const getAllRestaurants = asyncHandler(async (req, res) => {

const restaurants = await Restaurant.find({});
// const obj = { countRes, restaurants };
  res.json(restaurants);
});

// Fetch detail restaurants by id
// Method GET http://localhost:5000/api/restaurants/:id
const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  const reviews = await Review.find({ restaurantId: req.params.id });
  const avgRating = await Review.aggregate([
    {$group: {_id:null, avgRating: {$avg:"$rating"} } }
])
  const obj = { reviews, restaurant,avgRating };
  if (restaurant && reviews) res.json(obj);
  else {
    res.status(404);
    throw new Error("Restaurant Not Found");
  }
});

// Update a single restaurant
// Method PUT /api/restaurants/:id
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, location, price } = req.body;
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    restaurant.name = name;
    restaurant.location = location;
    restaurant.price = price;
    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// Delete a single restaurant
// Method DELETE /api/restaurants/:id
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    await restaurant.remove();
    res.json({ message: "Restaurant removed" });
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// Create a single restaurant
// Method POST /api/restaurants
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, location, price } = req.body;
  const restaurant = new Restaurant({
    name,
    price: Number(price),
    location,
  });
  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

// Create review of single restaurant
// Method POST /api/restaurants/:id/addReview
const createReview = asyncHandler(async (req, res) => {
  const { name, description, rating, restaurantId } = req.body;
  // console.log("create review",req.body)
  const review = new Review({
    name,
    description,
    rating: Number(rating),
    restaurantId,
  });
  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

export {
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  createRestaurant,
  getRestaurant,
  createReview,
};
