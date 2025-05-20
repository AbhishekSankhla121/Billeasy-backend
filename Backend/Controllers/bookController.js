import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Book } from "../Models/book.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllBooks =catchAsyncError(async (req, res, next) => {
     return next(new ErrorHandler("book", 400))
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