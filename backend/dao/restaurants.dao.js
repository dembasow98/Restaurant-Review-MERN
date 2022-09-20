import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

let restaurants

export default class RestaurantsDAO{
    static async injectDB(conn){
        if(restaurants){
            return
        }
        
        try{
            //restaurants = conn.db.collection("restaurants");
            restaurants = mongoose.connection.db.collection("restaurants");
        }catch(e) {
            console.error(`Unable to establish a collection handle in RestaurantsDAO! ${e}.`);
        }
    }
    static async getAllRestaurants( {filters = null, page = 0, restaurantsPerPage =20} = {}){
    
        let query;
        if(filters){
           if ("name" in filters){
                query = {$text: {  $search: filters["name"] }};
           }else if("cuisine" in filters){
                query = {"cuisine":  { $eq: filters["cuisine"]}};
           }else if("zipcode" in filters){
                query = {"address.zipcode":  { $eq: filters["zipcode"]}};
           }
        }


        let cursor;

        try{
            cursor = await restaurants.find(query)
        }catch(e){
            console.error(`Unable to retrieve restaurants from RestaurantsDAO! ${e}.`);

            return {
                restaurantsList: [],
                totalRestaurants: 0
            }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(page * restaurantsPerPage);
        
        try{
            const restaurantsList = await displayCursor.toArray();
            //const totalRestaurants = page == 0 ? await restaurants.countDocuments(query) : restaurantsList.length;
            const totalRestaurants = await restaurants.countDocuments(query);

            
            return{
                restaurantsList,
                totalRestaurants
            }
        }catch(e){
            console.error(`Unable to retrieve restaurants from RestaurantsDAO! ${e}.`);
            return {
                restaurantsList: [],
                totalRestaurants: 0
            }
        }
    }

    static async getRestaurantById(id){

        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id)
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"]
                                    }
                                }
                            },
                            {
                                $sort: {
                                    date: -1
                                }
                            }
                        ],
                        as: "reviews"
                    }
                },
                {
                    $addFields: {
                        reviews: "$reviews"
                    }
                }


            ]
            const restaurant = await restaurants.aggregate(pipeline).toArray();
            //Testing purposes only:
            console.log("restaurant[0]: \n", restaurant[0]);
            return restaurant[0];
        }catch(e){
            console.error(`Unable to retrieve restaurant from RestaurantsDAO! ${e}.`);
            throw e;
        }
        /*try{
            const restaurant = await restaurants.findOne({_id: id});
            return restaurant;
        }catch(e){
            console.error(`Unable to retrieve restaurant from RestaurantsDAO! ${e}.`);
            return null;
        }*/
    }

    static async getRestaurantCuisines(){
        
        let cuisines = [];

        try{
            console.log("getRestaurantCuisines try block");
            cuisines = await restaurants.distinct("cuisine");
            console.log("cuisines", cuisines);
            return cuisines;
        }catch(e){
            console.log("getRestaurantCuisines catch block");
            console.error(`Unable to retrieve cuisines from RestaurantsDAO! ${e}.`);
            return cuisines;
        }

        return cuisines;
    }
}

