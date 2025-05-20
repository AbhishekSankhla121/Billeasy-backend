import express from "express"
import { login, signup } from "../Controllers/userController.js"

const Router = express.Router();

Router.route("/user/signup").post(signup)
Router.route("/user/login").post(login)

export default Router