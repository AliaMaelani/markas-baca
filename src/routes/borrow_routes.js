const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrow_controller");

router.post("/book", borrowController.borrowBook); 
router.get("/book/list", borrowController.getActiveBorrows); 
router.post("/book/return", borrowController.returnBook);  

module.exports = router;
