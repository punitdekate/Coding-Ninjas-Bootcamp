// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

const LikeModel = mongoose.model('Like', likeSchema)
export const likeRepo = async(user_id, job_id, model) => {
    // Write your code here
    try {
        const like = new LikeModel({
            user: user_id,
            likeable: job_id,
            on_model: model
        });
        const savedLike = await like.save();
        return savedLike;
    } catch (error) {
        throw new customErrorHandler(400, "Something went wrong with database");
    }
};
export const getLikesRepo = async(id, on_model) => {
    // Write your code here
    const likes = await LikeModel.find({ likeable: id, on_model: on_model });
    // console.log(likes);
    return likes;
};