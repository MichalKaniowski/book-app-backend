const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    age: { type: Number, required: true },
    categories: [{ type: String, required: true }],
    discussionTopics: [{ type: String, required: false }],
    estimatedReadingTime: { type: Number, required: true },
    isPremium: { type: Boolean, required: true },
    keywords: [{ type: String, required: true }],
    questions: [{ type: String, required: false }],
    rating: { type: Number, default: 0 },
    author: { type: String, required: false },
    illustrator: { type: String, required: false },
    translator: { type: String, required: false },
    imageUrl: { type: String, required: true },
    backgroundColor: [{ type: String, required: true }],
  },
  { timestamps: false }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = { Book, bookSchema };
