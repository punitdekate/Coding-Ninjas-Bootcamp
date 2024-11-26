// 1. Import MongoDB Client
import { MongoClient } from "mongodb";
const url = 'mongodb://localhost:27017/confession';
// 2. Function to connect to the database
let clientdb;
export const connectToMongoDB = () => {
    MongoClient.connect(url).catch(client => {
        clientdb = client;
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err);
    })
};

// 3. Function to access the database
export const getDB = () => {
    return clientdb.db();
};