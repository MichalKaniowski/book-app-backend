const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookRecommendations,
  getFilteredBooksByCategory,
  getBooksFilteredByName,
  getShelfBooks,
  addBookToShelfBooks,
} = require("../controllers/bookController");

router.get("/getBooks", getBooks);
router.get("/getBookRecommendations", getBookRecommendations);
router.get("/getFilteredBooksByCategory", getFilteredBooksByCategory);
router.get("/getBooksFilteredByName/:name", getBooksFilteredByName);
router.get("/getShelfBooks", getShelfBooks);

router.post("/addBookToShelfBooks", addBookToShelfBooks);

module.exports = router;
