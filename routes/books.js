const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Handler function to wrap routes and avoid repetition
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

/* GET a list of books */
router.get('/', asyncHandler( async(req, res) => {
  const books = await Book.findAll({order: [["year", "DESC"]]});
  res.render("books/all_books", { books: books, title: "SQL Library Manager" });
}));

/* Create a new book form. */
router.get('/new_book', asyncHandler( async (req, res) => {
   res.render("books/new_book", { books: {}, title: "New Book" });
}));

/* CREATE a book */ 
router.post('/', asyncHandler( async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/');
}));

/* READ individual book */
router.get('/:id', asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/book_detail', { book: book});
}));

/* UPDATE a book */
router.post('/:id', asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/');
}));

/* DELETE a book */
router.post('/:id/delete', asyncHandler( async (req, res) =>{
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
}))


/* 

- Set up a custom error handler middleware function that logs the error to the console and r
enders an “Error” view with a friendly message for the user. 
This is useful if the server encounters an error, like trying to view the “Books Detail” page for a book :id 
that doesn’t exist. See the error.html file in the example-markup folder to see what this would look like.

- Set up a middleware function that returns a 404 NOT FOUND HTTP status code and renders a "Page Not Found" 
view when the user navigates to a non-existent route, such as /error. See the page_found.html file in the 
example markup folder for an example of what this would look like. 

*/
 
module.exports = router;
