import express from "express"
import { signup } from "../Controllers/userController.js"

const Router = express.Router();

Router.route("/user").get(signup)

export default Router