const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookRecommendations,
  getFilteredBooksByCategory,
  getBooksFilteredByName,
  getShelfBooks,
  addBookToShelfBooks,
  addBookToFinishedBooks,
} = require("../controllers/bookController");

router.get("/getBooks", getBooks);
router.get("/getBookRecommendations", getBookRecommendations);
router.get("/getFilteredBooksByCategory/:category", getFilteredBooksByCategory);
router.get("/getBooksFilteredByName/:name", getBooksFilteredByName);
router.get("/getShelfBooks/:firebaseId", getShelfBooks);

router.post("/addBookToShelfBooks", addBookToShelfBooks);
router.post("/addBookToFinishedBooks", addBookToFinishedBooks);

module.exports = router;
