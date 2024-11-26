// Make necessary imports here.
// Don't change the pre-written code.

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';
import { ObjectId } from 'mongoose';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

//creating model for author

const authorModel = mongoose.model("Author", authorSchema);


export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId)
        }
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);

        await book.save();

        return savedReview;

    }

    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    // Complete the following four funtions.
    async createAuthor(authorData) {
        const author = new authorModel(authorData);
        const savedAuthor = await author.save();
        return savedAuthor;
    }

    async addAuthorToBook(bookId, authorId) {
        const book = await booksModel.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        const author = await authorModel.findById(authorId);
        if (!author) {
            throw new Error("Author not found")
        }
        book.authors.push(authorId);
        author.books.push(bookId);
        const savedBook = await book.save();
        const savedAuthor = await author.save();
        return { "book": savedBook, "author": savedAuthor }
    }

    async listAuthorsByBook(bookId) {
        const book = await booksModel.findById(bookId);
        const authorDetails = await authorModel.find({
            _id: { $in: book.authors }
        })
        return authorDetails;
    }

    async listBooksByAuthor(authorId) {
        const author = await authorModel.findById(authorId);
        const bookDetails = await booksModel.find({
            _id: { $in: author.books }
        })
        return bookDetails;
    }
}