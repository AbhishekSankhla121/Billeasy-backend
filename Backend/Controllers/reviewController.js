import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Book } from "../Models/book.js";
import { Review } from "../Models/review.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;
  const userId = req.user._id;


  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });

  // Ensure no duplicate review
  const existingReview = await Review.findOne({ book: bookId, user: userId });
  if (existingReview) {
    return res.status(400).json({ success: false, message: "You already reviewed this book" });
  }

  const review = await Review.create({
    book: bookId,
    user: userId,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    review,
  });
});


export const updateReview = catchAsyncError(async (req, res, next) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);

  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized to edit this review" });
  }

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});


export const deleteReview = catchAsyncError(async (req, res, next) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);

  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});