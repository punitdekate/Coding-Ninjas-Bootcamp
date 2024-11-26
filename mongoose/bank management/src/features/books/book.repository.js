// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { ObjectId } from 'mongoose';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------


    // Complete the following functions:

    //filtering the books based on genre
    async listBooksByGenre(genre) {
        return await booksModel.find({ genre: genre });
    }

    //increasing the count of available books
    async updateBookAvailability(bookId, quantity) {
        const book = await booksModel.findById(bookId);
        if (book) {
            book.availableCopies = book.availableCopies + quantity;
            await book.save();
            return book;
        }

    }

    //deletion of book
    async deleteBookById(bookId) {
        const bookDeleted = await booksModel.findByIdAndDelete(bookId);
        return bookDeleted;
    }
}