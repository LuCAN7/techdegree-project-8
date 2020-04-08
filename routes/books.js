const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


/* GET a list of books */
router.get('/', (req, res, next) => {

  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
    res.render("books/all_books", { books: books });
  }).catch(function(error){
      res.send(500, error);
  });



})


module.exports = router;
