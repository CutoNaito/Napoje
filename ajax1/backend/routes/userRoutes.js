import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers).post(userController.createUser);
router.route("/:id").get(userController.getUser);
router.route("/name/:name").get(userController.getUserByName);
router.route("/login").post(userController.login);

export default router;