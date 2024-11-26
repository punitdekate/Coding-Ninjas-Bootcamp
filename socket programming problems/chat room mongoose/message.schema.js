// make the necessary imports here
import mongoose from "mongoose";
// implement the below schema
const messageSchema = new mongoose.Schema({
    username: String,
    text: String,
    room: String,
    timestamp: Date
})

const messageModel = mongoose.model("Chat", messageSchema);
export default messageModel;