// Please don't change the pre-written code
// Import the necessary modules here
import { getDB } from "../../config/mongodb.js";
export default class BucketListRepository {
    async addBucketListItem(bucketListItem) {
        // Write your code here
        const db = getDB();
        await db.collection("bucketListItems").insertOne(bucketListItem);
        return bucketListItem;
    }

    async findOneBucketListItem(title) {
        // Write your code here
        const db = getDB();
        const item = await db.collection("bucketListItems").findOne({ title: title });
        return item;
    }
}