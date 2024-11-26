import mongoose from 'mongoose';
import BookRepository from "./book.repository.js";

export default class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    //------change code in below functions only--------

    // creation of book
    createBook = async(req, res) => {
        try {
            const book = await this.bookRepository.createBook(req.body);
            return res.status(201).send(book)
        } catch (error) {
            console.log(error);
        }

    }

    // filtering of book by id
    getOne = async(req, res) => {
        const book = await this.bookRepository.getOne(req.params.bookId);
        if (book) {
            return res.status(200).send(book)
        } else {
            return res.status(404).send("book not found")
        }
    }

}