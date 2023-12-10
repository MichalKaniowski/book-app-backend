const { Book } = require("../models/Book");
const { User } = require("../models/User");

// get requests
async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getBookRecommendations(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getFilteredBooksByCategory(req, res) {
  try {
    const category = req.params.category;
    let books = await Book.find();

    if (category === "3+" || category === "5+" || category === "8+") {
      books = books.filter((book) => book.age >= Number(category[0]));
    } else {
      books = books.filter((book) => book.category === category);
    }

    res.json(books);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getBooksFilteredByName(req, res) {
  try {
    const name = req.params.name;

    const books = await Book.find();

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(name.trim().toLowerCase())
    );

    res.json(filteredBooks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getShelfBooks(req, res) {
  try {
    const userFirebaseId = req.params.firebaseId;

    console.log(userFirebaseId);

    const users = await User.find();
    const user = users.find((user) => user.firebaseId === userFirebaseId);

    const readBooks = user?.readBooks ?? [];

    res.json(readBooks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// post requests
async function addBookToShelfBooks(req, res) {
  try {
    const { userFirebaseId, book } = req.body;

    const user = await User.findOne({ firebaseId: userFirebaseId });

    const bookInUserDocument = user?.readBooks.find(
      (readBook) => readBook._id === book._id
    );

    if (!bookInUserDocument) {
      const newReadBooks = [...user?.readBooks, book];

      // not using updateOne, because this doesn't return new user
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { readBooks: newReadBooks },
        { returnDocument: "after" }
      );

      res.json(updatedUser);
    }

    res.json(bookInUserDocument);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

module.exports = {
  getBooks,
  getBookRecommendations,
  getFilteredBooksByCategory,
  getBooksFilteredByName,
  getShelfBooks,
  addBookToShelfBooks,
};
