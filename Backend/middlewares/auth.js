import jwt from "jsonwebtoken"
import { User } from "../Models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) next(new ErrorHandler("isAuthenticated middleware token not found!", 401))//401 means un-Authorized
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ _id: data._id });
    next()
}
);