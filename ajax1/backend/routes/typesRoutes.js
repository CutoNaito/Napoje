import express from "express";
import typesController from "../controllers/typesController.js";

const router = express.Router();

router.route("/").get(typesController.getTypesList);

export default router;