const Book = require('../models/book');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({publishedDate: -1});
        res.json(books);
    } catch (error) {
        res.status(500).json({message: 'Error fetching books', error: error.message});
    }
};

exports.addBook = async (req, res) => {
    const {title, author, price, publishedDate} = req.body;
        const book = new Book({title, author, price, publishedDate })

    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({message: 'Error adding book', error: error.message});
    }
};

exports.updateBook = async (req, res) => {
    const {id} = req.params;
    const {title, author, price, publishedDate} = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {title, author, price, publishedDate},
            {new: true, runValidators: true}
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({message: 'Error updating book', error: error.message});
    }
};

exports.deleteBook = async (req, res) => {  
    const {id} = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({message: 'Error deleting book', error: error.message});
    }
};
