import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Book } from "../Models/book.js";
import { Review } from "../Models/review.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllBooks = catchAsyncError(async (req, res, next) => {
  const { page = 1, limit = 10, author, genre } = req.query;

  const query = {};
  if (author) query.author = new RegExp(author, "i"); // case-insensitive
  if (genre) query.genre = new RegExp(genre, "i");

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Book.countDocuments(query);

  res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    books,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const addBook =catchAsyncError(async (req, res, next) => {
    const {title,author,description,genre} = req.body
    if(!title &&!author && !description&& !genre) return next(new ErrorHandler("please enter all filed", 400));

    const book = await Book.create({
    title,
    author,
    description,
    genre,
    "addedBy": req.user._id
    })

     res.status(201).json({
        message: "book added successfully!",
        success: true,
        book
    })
});

export const getBookById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;

  // 1. Get the book
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  // 2. Get reviews for that book with pagination
  const reviews = await Review.find({ book: id })
    .populate("user", "username email")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalReviews = await Review.countDocuments({ book: id });

  // 3. Calculate average rating
  const ratings = await Review.aggregate([
    { $match: { book: book._id } },
    {
      $group: {
        _id: "$book",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRating = ratings[0]?.averageRating || 0;

  res.status(200).json({
    success: true,
    message: "Book fetched successfully",
    book,
    averageRating: averageRating.toFixed(2),
    reviews,
    pagination: {
      total: totalReviews,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalReviews / limit),
    },
  });
});