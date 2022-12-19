import Drinks from "../models/Drinks.js";

async function createDrink(req, res, next) {
    const drink = new Drinks(req.body.name, req.body.type, req.body.date);
    try {
        const result = await drink.save();
        res.status(201).json({ message: 'Drink created!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getDrink(req, res, next) {
    const drink = new Drinks();
    try {
        const result = await drink.getByID(req.params.id);
        res.status(200).json({ message: 'Drink found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getAllDrinks(req, res, next) {
    const drink = new Drinks();
    try {
        const result = await drink.getAll();
        res.status(200).json({ message: 'Drinks found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getDrinkByName(req, res, next) {
    const drink = new Drinks();
    try {
        const result = await drink.getByName(req.params.name);
        res.status(200).json({ message: 'Drink found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getDrinkByNameWithinAMonth(req, res, next) {
    const drink = new Drinks();
    try {
        const result = await drink.getByNameWithinAMonth(req.params.name, req.params.month);
        res.status(200).json({ message: 'Drink found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getDrinkByType(req, res, next) {
    const drink = new Drinks();
    try {
        const result = await drink.getByType(req.params.type);
        res.status(200).json({ message: 'Drink found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

export default {
    createDrink,
    getDrink,
    getAllDrinks,
    getDrinkByName,
    getDrinkByNameWithinAMonth,
    getDrinkByType
};