const mongoose = require("mongoose");
const { bookSchema } = require("./Book");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    readBooks: [{ type: bookSchema, required: false }],
    firebaseId: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
