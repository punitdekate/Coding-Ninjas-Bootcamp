// Please don't change the pre-written code
// Import the necessary modules here(if required)

import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
    // Write your code here
    text: { type: String, required: [true, "text is required"] },
    rating: {
        type: Number,
        validate: {
            validator: function(rate) {
                return rate > 0 && rate <= 5;
            },
            message: "Rating should be in between 1 - 5"
        },
        require: [true, "rating is required"]
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
});