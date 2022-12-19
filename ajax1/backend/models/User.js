import database from '../config/dbconfig.js';

class User{
    constructor(name, email, password, token){
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = token;
    }

    async save(){
        try{
            const [result] = await database.execute('INSERT INTO people (name, email, password, token) VALUES (?, ?, ?, ?)', [this.name, this.email, this.password, this.token]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async getByID(id){
        try{
            const [result] = await database.execute('SELECT * FROM people WHERE id = ?', [id]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async getAll(){
        try{
            const [result] = await database.execute('SELECT * FROM people');
            return result;
        } catch(error){
            throw error;
        }
    }

    async getByName(name){
        try{
            const [result] = await database.execute('SELECT * FROM people WHERE name = ?', [name]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async login(email, password){
        try{
            const [result] = await database.execute('SELECT * FROM people WHERE email = ?', [email]);
            return result;
        } catch(error){
            throw error;
        }
    }

    async getByToken(token){
        try{
            const [result] = await database.execute('SELECT * FROM people WHERE token = ?', [token]);
            return result;
        } catch(error){
            throw error;
        }
    }
}

export default User;