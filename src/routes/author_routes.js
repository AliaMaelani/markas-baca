const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author_controller'); 

router.get("/", authorController.getAllAuthors); 
router.get("/:id", authorController.getAuthorById); 
router.post("/", authorController.createAuthor); 
router.put("/:id", authorController.updateAuthor); 
router.delete("/:id", authorController.deleteAuthor); 
router.post('/upload', authorController.uploadAuthorPhoto); 

module.exports = router;
