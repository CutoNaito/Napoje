import User from '../models/User.js';
import bcrypt from 'bcrypt';

async function createUser(req, res, next) {
    const user = new User(req.body.name, req.body.email, req.body.password, req.body.token);
    try {
        const result = await user.save();
        res.status(201).json({ message: 'User created!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getUser(req, res, next) {
    const user = new User();
    try {
        const result = await user.getByID(req.params.id);
        res.status(200).json({ message: 'User found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getAllUsers(req, res, next) {
    const user = new User();
    try {
        const result = await user.getAll();
        res.status(200).json({ message: 'Users found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getUserByName(req, res, next) {
    const user = new User();
    try {
        const result = await user.getByName(req.params.name);
        res.status(200).json({ message: 'User found!', result: result, match: match });
    } catch (error) {
        console.log(error);
    }
};

async function login(req, res, next) {
    const user = new User();
    try {
        const result = await user.login(req.body.email, req.body.password);
        const match = await bcrypt.compare(req.body.password, result[0].password);
        res.status(200).json({ message: 'User found!', result: result, match: match });
    } catch (error) {
        console.log(error);
    }
};

export default {
    createUser,
    getUser,
    getAllUsers,
    getUserByName,
    login
};