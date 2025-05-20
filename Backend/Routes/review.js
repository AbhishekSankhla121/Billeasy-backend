import express from "express"
import { createReview, deleteReview, updateReview} from "../Controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.route("/books/:id/reviews").post(isAuthenticated, createReview);
Router.route("/reviews/:id").put(isAuthenticated, updateReview).delete(isAuthenticated, deleteReview);

export default Router