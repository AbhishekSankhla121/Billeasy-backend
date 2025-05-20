import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllBooks =catchAsyncError(async (req, res, next) => {
     return next(new ErrorHandler("book", 400))
});