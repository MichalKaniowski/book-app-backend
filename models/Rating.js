const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    bookId: { type: mongoose.Types.ObjectId, ref: "Book", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    number: { type: Number, required: true },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = { Rating };
