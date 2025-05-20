import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getreview =catchAsyncError(async (req, res, next) => {
     return next(new ErrorHandler("review", 400))
});