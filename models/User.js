const mongoose = require("mongoose");
const { bookSchema } = require("./Book");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    shelfBooks: [{ type: bookSchema, required: false }],
    finishedBooks: [
      { type: mongoose.Types.ObjectId, ref: "Book", required: true },
    ],
    firebaseId: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
