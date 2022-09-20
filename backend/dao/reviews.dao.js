import mongoose from "mongoose";
//import Review from "../model/reviews.model";
const ObjectId = mongoose.Types.ObjectId;

let reviews = {};


export default class ReviewsDAO {

    static async injectDB(connection) {
        if (this.reviews) {
            return;
        }
        else{
            try {
                reviews = mongoose.connection.db.collection("reviews");
                
            } 
            catch (e) {
                console.error(`Unable to establish collection handles in Reviews DAO! ${e}`);
            }
        }
       
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            };

            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review! ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } }
            );

            return updateResponse;
        } catch (e) {   
            console.error(`Unable to update review! ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await this.reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review! ${e}`);
            return { error: e };
        }
    }
}