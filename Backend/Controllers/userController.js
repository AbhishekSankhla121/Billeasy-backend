import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


export const signup = catchAsyncError(async (req, res, next) => {
     return next(new ErrorHandler("user", 400))
});