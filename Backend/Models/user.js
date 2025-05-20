import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { 
      select: false,
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be at least 6 characters"],
    }
  },
  { timestamps: true } 
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

const User = mongoose.model("User", userSchema)

export {User}