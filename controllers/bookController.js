const { Book } = require("../models/Book");
const { Rating } = require("../models/Rating");
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
      books = books.filter((book) => book.age <= Number(category[0]));
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

    const users = await User.find();
    const user = users.find((user) => user.firebaseId === userFirebaseId);

    const shelfBooks = user?.shelfBooks ?? [];

    res.json({ books: shelfBooks, user: user });
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

    const bookInUserDocument = user.shelfBooks.find(
      (readBook) => readBook._id.toString() === book._id.toString()
    );

    if (!bookInUserDocument) {
      const newShelfBooks = [...user?.shelfBooks, book];

      // not using updateOne, because it doesn't return new user
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { shelfBooks: newShelfBooks },
        { returnDocument: "after" }
      );

      return res.json(updatedUser);
    }

    res.json(bookInUserDocument);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function addBookToFinishedBooks(req, res) {
  try {
    const { userFirebaseId, bookId } = req.body;

    const user = await User.findOne({ firebaseId: userFirebaseId });

    const bookInUserDocument = user.finishedBooks.find(
      (book) => book._id.toString() === bookId
    );

    if (!bookInUserDocument) {
      const newFinishedBooks = [...user.finishedBooks, bookId];
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { finishedBooks: newFinishedBooks },
        { returnDocument: "after" }
      );

      return res.json(updatedUser);
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function addBookRating(req, res) {
  try {
    const { bookId, userFirebaseId, number } = req.body;

    const user = await User.findOne({ firebaseId: userFirebaseId });

    const bookInRatedBooks = user.ratedBooks.find(
      (book) => book._id.toString() === bookId
    );

    if (bookInRatedBooks) {
      const ratedBooksWithoutTheBook = user.ratedBooks.filter(
        (book) => book._id !== bookId
      );

      await User.updateOne(
        { firebaseId: userFirebaseId },
        {
          ratedBooks: [
            ...ratedBooksWithoutTheBook,
            { ...bookInRatedBooks, number },
          ],
        }
      );
      return res.json({ message: "Rating has been updated" });
    }

    await Rating.create({ bookId, userId: user._id, number });
    await User.updateOne(
      { _id: user._id },
      { ratedBooks: [...user.ratedBooks, bookId] }
    );

    const ratings = await Rating.find();

    const bookRatings = ratings.filter(
      (rating) => rating.bookId.toString() === bookId
    );

    const bookRatingsSum =
      bookRatings.length === 0
        ? 0
        : bookRatings.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.number;
          }, 0);

    const bookRatingsMean = (bookRatingsSum / bookRatings.length).toFixed(1);

    await Book.updateOne(
      { _id: bookId },
      {
        rating: bookRatingsMean,
      }
    );

    res.json(bookRatingsMean);
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
  addBookToFinishedBooks,
  addBookRating,
};
