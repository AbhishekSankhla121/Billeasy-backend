import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../Models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendtoken.js";


export const signup = catchAsyncError(async (req, res, next) => {
     const {username,email,password} = req.body
     if(!username && !email && !password) return next(new ErrorHandler("All input fields are requried", 400))
   
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already exist !", 409)); 
    
    user = await User.create({
    username,
    email,
    password
    })
    
  

    sendToken(res, user, "Register Successfully!", 201)
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("please enter all filed", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not exist!", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("invalid credential in login route", 401));
    sendToken(res, user, `Welcome Back ${user.username}`, 200);
});