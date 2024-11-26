import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'


const BookModel = new mongoose.model("Books", bookSchema);
export default class BookRepository {


    // -----Change code in below functions only-----

    //book creation
    async createBook(bookData) {
        const newBook = new BookModel(bookData);
        await newBook.save();
        return newBook;
    }

    //filtering the book by id
    async getOne(id) {
        return await BookModel.findOne({ _id: id });
    }
}