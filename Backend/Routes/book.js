import express from "express"
import { addBook, getAllBooks } from "../Controllers/bookController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.route("/books").get(isAuthenticated,getAllBooks).post(isAuthenticated ,addBook)

export default Router