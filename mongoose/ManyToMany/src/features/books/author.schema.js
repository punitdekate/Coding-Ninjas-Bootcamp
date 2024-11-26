// Import necessary modules here
import mongoose from "mongoose";
export const authorSchema = mongoose.Schema({
    // Write your code here
    name: { type: String, trim: true, required: true },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
});