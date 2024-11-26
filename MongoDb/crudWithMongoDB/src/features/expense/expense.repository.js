import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js'
class ExpenseRepository {
    constructor() {
        this.collectionName = "expenses"; // name of the collection in mongodb
    }

    // Create a new expense
    async addExpense(expense) {
        try {
            const db = getDB();
            const collection = await db.collection(this.collectionName);
            const addedExpense = collection.insertOne(expense);
            return addedExpense;
        } catch (error) {
            console.log(error);
        }

    }

    // Get one expnese by its ID
    async getOne(id) {
        try {
            const db = getDB();
            const collection = await db.collection(this.collectionName);
            const expense = await collection.findOne({ _id: new ObjectId(id) })
            return expense;
        } catch (error) {
            console.log(error);
        }

    }

    // Get all expenses
    async getAllExpenses() {
        try {
            const db = getDB();
            const collection = await db.collection(this.collectionName);
            const allExpenses = await collection.find().toArray();
            return allExpenses;
        } catch (error) {
            console.log(error);
        }

    }

    // Add tag to an expense
    async addTagToExpense(id, tag) {
        const db = getDB();
        const collection = await db.collection(this.collectionName);
        const addedTag = await collection.updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } })
        return addedTag;
    }

    // Filter expenses based on date, amount, and isRecurring field
    async filterExpenses(criteria) {
        const { minAmount, maxAmount, isRecurring } = criteria;
        const db = getDB();
        const collection = await db.collection(this.collectionName);
        const filterCriteria = {};
        if (minAmount) {
            filterCriteria.amount = { $gte: parseFloat(minAmount) };
        }
        if (maxAmount) {
            filterCriteria.amount = {...filterCriteria.amount, $lte: parseFloat(maxAmount) };
        }
        if (isRecurring) {
            filterCriteria.isRecurring = isRecurring === 'true' ? true : false;
        }
        const filteredExpenses = await collection.find(filterCriteria).toArray();
        // console.log(filterCriteria, filteredExpenses);
        return filteredExpenses;
    }
}

export default ExpenseRepository;