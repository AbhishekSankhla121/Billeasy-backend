import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  author:      { type: String, required: true },
  genre:       { type: String },
  description: { type: String },
  addedBy:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);
