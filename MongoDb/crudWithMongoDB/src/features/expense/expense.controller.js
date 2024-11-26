import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
    constructor() {
        this.expenseRepository = new ExpenseRepository();
    }

    // Create new expense
    add = async(req, res) => {
        try {
            const { title, amount, date, isRecurring, tags } = req.body;
            const expense = new ExpenseModel(title, amount, date, isRecurring, tags);
            const addedExpense = await this.expenseRepository.addExpense(expense)
            return res.status(201).send(expense);
        } catch (error) {
            console,
            log(error);
        }

    };

    // Get a specific expense
    getOne = async(req, res) => {
        try {
            const _id = req.params.id;
            const expense = await this.expenseRepository.getOne(_id);
            return res.status(200).send(expense);
        } catch (error) {
            console.log(error);
        }
    };

    // Get all expenses
    getAll = async(req, res) => {
        try {
            const expense = await this.expenseRepository.getAllExpenses();
            return res.status(200).send(expense);
        } catch (error) {
            console.log(error);
        }
    };

    // Add a tag to an expense
    addTag = async(req, res) => {
        const id = req.params.id;
        let tags = req.body.tag;
        const addedTag = await this.expenseRepository.addTagToExpense(id, tags);
        return res.status(200).send("Tag added successfully")
    };

    // Filter expenses based on given criteria
    filter = async(req, res) => {
        console.log(req.query);
        const expenses = await this.expenseRepository.filterExpenses(req.query)
        res.status(200).send(expenses);
    };
}