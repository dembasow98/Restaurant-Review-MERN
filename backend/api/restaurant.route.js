import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router();

//Testing the API
//router.route('/').get((req, res) => res.send("Hello World"));

//Test the API
router.route('/').get(RestaurantsController.apiGetAllRestaurants);
router.route('/id/:id').get(RestaurantsController.apiGetRestaurantById);
router.route('/cuisines').post(RestaurantsController.apiGetRestaurantCuisines);

//User reviews


router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);

export default router;