const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book_controller');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook); 
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

// Tambahkan route untuk upload cover
router.post('/upload', bookController.uploadBookCover, bookController.uploadCover); 

module.exports = router;
