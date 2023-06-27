const router = require('express').Router();
const {getNewBook, postNewBook, getBooks, getBooksId, getEditBook, postEditBook, postDeleteBook} = require("../controllers/books.controller.js");


router.get('/books/create', getNewBook);

router.post('/books/create', postNewBook);

router.get('/books', getBooks);

router.get('/books/:bookId', getBooksId);

router.get('/books/:bookId/edit', getEditBook);

router.post('/books/:bookId/edit', postEditBook);

router.post('/books/:bookId/delete', postDeleteBook);


module.exports = router;
