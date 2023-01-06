import Types from "../models/Types.js";

async function getTypesList(req, res, next) {
    const types = new Types();
    try {
        const result = await types.getAll();
        res.status(200).json({ message: "Types found!", result: result });
    } catch (error) {
        console.log(error);
    }
}

export default {
    getTypesList
};