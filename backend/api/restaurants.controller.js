import RestaurantsDAO from "../dao/restaurants.dao.js";


export default class RestaurantsController {
    

    static async apiGetAllRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};

        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine;
        }else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode;
        }else if(req.query.name){
            filters.name = req.query.name;
        }


        const {restaurantsList, totalRestaurants} = await RestaurantsDAO.getAllRestaurants({filters, page, restaurantsPerPage});

        let response = {
            restaurants : restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalRestaurants,
        };

        res.json(response);
    }

    static async apiGetRestaurantById(req, res, next) {

        try{
            let id = req.params.id || {};
            let restaurant = await RestaurantsDAO.getRestaurantById(id);

            if(!restaurant){
                //throw new Error("Restaurant not found!");
                res.status(404).json({error: "Restaurant not found!"});
            }
            res.json(restaurant);
        }catch(e){
            console.log(`API, ${e.message}`);
            res.status(500).json({error: e.message});
        }
       
    }

    static async apiGetRestaurantCuisines(req, res, next) {

        try {
            let cuisines = await RestaurantsDAO.getRestaurantCuisines()
            res.json(cuisines)
            console.log("apiGetRestaurantCuisines try block");

        } catch (e) {
            console.log("apiGetRestaurantCuisines catch block");
            console.log(`API, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}