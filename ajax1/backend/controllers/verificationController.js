import Verification from '../models/Verification.js';

async function createVerification(req, res, next) {
    const verification = new Verification(req.body.name, req.body.email, req.body.password, req.body.code);
    try {
        const result = await verification.save();
        res.status(201).json({ message: 'Verification created!', result: result });
    } catch (error) {
        console.log(error);
    }
}; 

async function getVerification(req, res, next) {
    const verification = new Verification();
    try {
        const result = await verification.getByEmail(req.params.email);
        res.status(200).json({ message: 'Verification found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getAllVerifications(req, res, next) {
    const verification = new Verification();
    try {
        const result = await verification.getAll();
        res.status(200).json({ message: 'Verifications found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function getVerificationByCode(req, res, next) {
    const verification = new Verification();
    try {
        const result = await verification.getByCode(req.params.code);
        res.status(200).json({ message: 'Verification found!', result: result });
    } catch (error) {
        console.log(error);
    }
};

async function deleteVerification(req, res, next) {
    const verification = new Verification();
    try {
        const result = await verification.delete(req.params.email);
        res.status(200).json({ message: 'Verification deleted!', result: result });
    } catch (error) {
        console.log(error);
    }
};

export default {
    createVerification,
    getVerification,
    getAllVerifications,
    getVerificationByCode,
    deleteVerification
};