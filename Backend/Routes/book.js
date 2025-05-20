import express from "express"
import { addBook, getAllBooks, getBookById } from "../Controllers/bookController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.route("/books").get(isAuthenticated,getAllBooks).post(isAuthenticated ,addBook)
Router.route("/books/:id").get(isAuthenticated, getBookById);

export default Router