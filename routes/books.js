const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Handler function to wrap each route and avoid repetition
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error) {
      // res.status(500);
      // res.render('books/error');
      return next(error);
    }
  }
}

/* GET a list of books */
router.get('/', asyncHandler( async(req, res) => {
  const books = await Book.findAll({order: [["year", "DESC"]]});
  res.render("books/index", { books: books, title: "SQL Library Manager" });
}));

/* Create a new book form. */
router.get('/new', asyncHandler( async (req, res) => {
   res.render("books/new-book", { books: {}, title: "New Book" });
}));

/* CREATE a book */ 
router.post('/new', asyncHandler( async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/');
  } catch(error) {
    if(error.name === "SequelizeValidationError") { // checking the error type
      book = await Book.build(req.body);
      res.render('books/new-book', { book: book, errors: error.errors });
      // console.log('1', errors);
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
  
}));

/* READ individual book */
router.get('/:id', asyncHandler( async (req, res) => {
  let book;
 
    book = await Book.findByPk(req.params.id);
    // Validate if a book is in the database
    if(book) {
      res.render('books/update-book', { book: book});
    } else {
      res.status(500);
      res.render('books/error');
    }

}));

/* UPDATE a book */
router.post('/:id', asyncHandler( async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/');
    } else {
      res.status(500);
      res.render('books/error');
    }
  } catch (error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct article gets updated
      res.render('books/new-book', {book: book, errors: error.errors});
      
    } else {      
      throw error; // error caught in the asyncHandler's catch block
    }
  } 
  
}));

/* DELETE a book */
router.post('/:id/delete', asyncHandler( async (req, res) =>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect('/');
  } else {
    res.status(400);
  }
  
}))

 
module.exports = router;
