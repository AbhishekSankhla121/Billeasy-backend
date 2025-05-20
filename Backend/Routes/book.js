import express from "express"
import { getAllBooks } from "../Controllers/bookController.js";

const Router = express.Router();

Router.route("/books").get(getAllBooks)

export default Router