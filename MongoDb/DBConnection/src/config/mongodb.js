// 1. Import MongoDB Client
import { MongoClient } from "mongodb";
const url = 'mongodb://localhost:27017/confession';
// 2. Function to connect to the database
let client;
export const connectToMongoDB = () => {
    MongoClient.connect(url).then(clientInstance => {
        client = clientInstance;
        console.log("MongoDB is connected");
    }).catch(error => {
        console.log("Some issue in DB connection\n" + error);
    })
};

// 3. Function to access the database
export const getDB = () => {
    return client.db();
};