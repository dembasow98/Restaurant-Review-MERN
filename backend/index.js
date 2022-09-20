import app from './server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//Import RestaurantsDao:
import RestaurantsDao from './dao/restaurants.dao.js';
import ReviewsDAO from './dao/reviews.dao.js';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();


//Port Number
const port = process.env.PORT || 8000;

//Connect to MongoDB
mongoose.connect(process.env.RESTAURANT_REVIEW_DB_URI)
.then(async client => {
    console.log('Connected to MongoDB successfully!');
    
    app.listen(port, () => {console.log(`Server is running on port ${port}`);})

    //Call RestaurantsDao.injectDB to inject the connection into the RestaurantsDao class
    await RestaurantsDao.injectDB(client);
    console.log('Restaurants DAO worked successfully!');
    //TESTING PURPOSES ONLY:
   /* await RestaurantsDao.getAllRestaurants();
    await RestaurantsDao.getRestaurantById('5c8f8f8f8f8f8f8f8f8f8f8');
    await RestaurantsDao.getRestaurantCuisines();*/

    //Call ReviewsDAO.injectDB to inject the connection into the ReviewsDAO class
    await ReviewsDAO.injectDB(client);
    console.log('Reviews DAO worked successfully!');
    

    //Call ReviewsDAO.addReview to add a review to the database
    //TESTING PURPOSES ONLY:
    /*await ReviewsDAO.addReview(
        "603d5a9b1b6e9b2b2c4c1b0c",
        {name: "Test User", _id: "603d5a9b1b6e9b2b2c4c1b0c"},
        "This is a test review!",
        new Date()
    );*/    


})
.catch((err) => {
    console.log(err);
});

