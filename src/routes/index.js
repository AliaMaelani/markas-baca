const express = require("express");
const testRoutes = require("./test_routes");
const authorRoutes = require("./author_routes");
const bookRoutes = require("./book_routes");
const borrowRoutes = require("./borrow_routes");
const borrowerRoutes = require("./borrower_routes");
const categoryRoutes = require('./category_routes');

const routes = express.Router();

routes.use("/test", testRoutes);
routes.use("/authors", authorRoutes);
routes.use("/books", bookRoutes);
routes.use("/borrows", borrowRoutes); 
routes.use("/borrowers", borrowerRoutes);
routes.use("/categories", categoryRoutes);

module.exports = routes;
