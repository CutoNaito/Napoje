import database from '../config/dbconfig.js';
import bcrypt from 'bcrypt';

class Verification{
    constructor(name, email, password, code){
        this.name = name;
        this.email = email;
        this.password = password;
        this.code = code;
    }

    async save(){
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            const [result] = await database.execute('INSERT INTO verification (name, email, password, code) VALUES (?, ?, ?, ?)', [this.name, this.email, hashedPassword, this.code]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async getByEmail(email){
        try{
            const [result] = await database.execute('SELECT * FROM verification WHERE email = ?', [email]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async getAll(){
        try{
            const [result] = await database.execute('SELECT * FROM verification');
            return result;
        } catch(error){
            throw error;
        }
    }

    async getByCode(code){
        try{
            const [result] = await database.execute('SELECT * FROM verification WHERE code = ?', [code]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async deleteByEmail(email){
        try{
            const [result] = await database.execute('DELETE FROM verification WHERE email = ?', [email]);
            return result;
        } catch(error){
            throw error;
        }
    }
}

export default Verification;