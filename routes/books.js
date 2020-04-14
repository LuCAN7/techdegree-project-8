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
router.get('/', asyncHandler( async(req, res, next) => {
  const books = await Book.findAll({order: [["year", "DESC"]]});
  res.render("books/all_books", { books: books, title: "SQL Library Manager" });
}));


/* Create a new book form. */
router.get('/new_book', asyncHandler( async (req, res) => {
   res.render("books/new_book", { books: {}, title: "New Book" });
}));


/* POST create a book */ 
router.post('/', asyncHandler( async (req, res, next) => {
  const book = await Book.create(req.body);
  // console.log(req.body);
  res.redirect('/');
}));

// Set up your server, middleware and routes
  // At the very least, you will need the following routes:
    // get / - Home route should redirect to the /books route. X

    // get /books - Shows the full list of books. X

    // get /books/new - Shows the create new book form. X

    // post /books/new - Posts a new book to the database.

    // get /books/:id - Shows book detail form.

    // post /books/:id - Updates book info in the database.

    // post /books/:id/delete - Deletes a book. 

    
        /*Careful, this can’t be undone. 
        It can be helpful to create a new “test” book to test deleting.*/


module.exports = router;
