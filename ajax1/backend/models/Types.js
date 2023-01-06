import database from '../config/dbconfig.js';

class Types{
    constructor(typ){
        this.typ = typ;
    }

    async getAll(){
        try{
            const [result] = await database.execute('SELECT * FROM types');
            return result;
        } catch(error){
            throw error;
        }
    }
}

export default Types;