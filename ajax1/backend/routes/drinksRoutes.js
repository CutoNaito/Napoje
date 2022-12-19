import express from "express";
import drinksController from "../controllers/drinksController.js";

const router = express.Router();

router.route("/").get(drinksController.getAllDrinks).post(drinksController.createDrink);
router.route("/:id").get(drinksController.getDrink);
router.route("/name/:name").get(drinksController.getDrinkByName);
router.route("/name/:name/month/:month").get(drinksController.getDrinkByNameWithinAMonth);
router.route("/type/:type").get(drinksController.getDrinkByType);

export default router;