import express from "express";
import drinksController from "../controllers/drinksController.js";

const router = express.Router();

router.route("/").get(drinksController.getAllDrinks).post(drinksController.saveDrinks);
router.route("/:id").get(drinksController.getDrink);
router.route("/name/:name").get(drinksController.getDrinkByName);
router.route("/summary/:name/:month").get(drinksController.getSummaryOfDrinks);
router.route("/type/:type").get(drinksController.getDrinkByType);
router.route("/priceSummary/:name/:month").get(drinksController.getSummaryPrice);

export default router;