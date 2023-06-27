const Book = require('../models/Book.model.js');


const getNewBook = (req, res) => res.render('books/book-create.hbs');

const postNewBook = (req, res, next) => {
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then(() => res.redirect('/books'))
    .catch(error => next(error));
};

const getBooks = (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      console.log('Retrieved books from DB:', allTheBooksFromDB);

      res.render('books/books-list.hbs', { books: allTheBooksFromDB });
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);

      next(error);
    });
};

const getBooksId = (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then(theBook => res.render('books/book-details.hbs', { book: theBook }))
    .catch(error => {
      console.log('Error while retrieving book details: ', error);

      next(error);
    });
};

const getEditBook = (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then(bookToEdit => {
      res.render('books/book-edit.hbs', { book: bookToEdit });
    })
    .catch(error => next(error));
};

const postEditBook = (req, res, next) => {
  const { bookId } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
    .then(updatedBook => res.redirect(`/books/${updatedBook.id}`))
    .catch(error => next(error));
};

const postDeleteBook = (req, res, next) => {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId)
    .then(() => res.redirect('/books'))
    .catch(error => next(error));
};


module.exports = {getNewBook, postNewBook, getBooks, getBooksId, getEditBook, postEditBook, postDeleteBook}
