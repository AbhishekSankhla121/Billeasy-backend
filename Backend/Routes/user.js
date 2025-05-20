import express from "express"
import { signup } from "../Controllers/userController.js"

const Router = express.Router();

Router.route("/user/signup").post(signup)

export default Router