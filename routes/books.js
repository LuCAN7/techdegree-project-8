const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Hnadler function to wrap routes and avoid repetition
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

/* POST create a book */ 
router.post('/', asyncHandler( async (req, res) => {
  const book = await Book.create(req.body);
  // console.log(req.body);
  // concatnated the book.id ** copied teachers notes **
  res.redirect('/');
}));

// /* Edit book details */
// router.get('/:id', asyncHandler( async (req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   req.render('books/book_detail', {book: book, title: 'EDIT'})
// }))

/* GET Edit individual book */
router.get('/:id', asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/book_detail', { book: book, title: 'EDIT'});
}));

/* UPDATE a book */
router.post('/:id', asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/');
  // res.render('books/book_detail', {book: book, title: 'UPDATE'});
}));

/* DELETE a book */
// method='post' action='/books/:id/delete'
router.post('/:id/delete', asyncHandler( async (req, res) =>{
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
}))

// app.use();
// C R U D - post, get, put, delete
// POST – Create
// GET – Read/Retrieve
// PUT/PATCH – Update
// DELETE – Delete


// Set up your server, middleware and routes
  // At the very least, you will need the following routes:
    // X get / - Home route should redirect to the /books route. X

    // X get /books - Shows the full list of books. X

    // X get /books/new - Shows the create new book form. X

    // X post /books/new - Posts a new book to the database. X - REDIRECT TO HOME??

    // X get /books/:id - Shows book detail form. X

    // X post /books/:id - Updates book info in the database.

    // post /books/:id/delete - Deletes a book. 

    
        /*Careful, this can’t be undone. 
        It can be helpful to create a new “test” book to test deleting.*/


module.exports = router;
