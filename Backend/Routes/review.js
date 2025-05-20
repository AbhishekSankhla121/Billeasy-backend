import express from "express"
import { getreview } from "../Controllers/reviewController.js";

const Router = express.Router();

Router.route("/review").get(getreview)

export default Router