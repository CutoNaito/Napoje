import database from '../config/dbconfig.js';

class Drinks{
    constructor(name, type, date) {
        this.name = name;
        this.type = type;
        this.date = date;
    }

    async save() {
        try {
            const [result] = await database.execute('INSERT INTO drinks (name, type, date) VALUES (?, ?, ?)', [this.name, this.type, this.date]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByID(id) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const [result] = await database.execute('SELECT * FROM drinks');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByName(name) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id_name = ?', [name]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByNameWithinAMonth(name, month) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id_name = ? AND MONTH(date) = ?', [name, month]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByType(type) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id_type = ?', [type]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Drinks;