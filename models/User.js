const mongoose = require("mongoose");
const { bookSchema } = require("./Book");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    shelfBooks: [{ type: bookSchema, default: [] }],
    finishedBooks: [
      { type: mongoose.Types.ObjectId, ref: "Book", default: [] },
    ],
    ratedBooks: [{ type: mongoose.Types.ObjectId, ref: "Book", default: [] }],
    firebaseId: { type: String, required: true },
    spentTime: {type: Number, default: 0}
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
