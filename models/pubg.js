import db from "../database/connection.js";

class Pubg {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pubg`, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO pubg (title, price) VALUES (?, ?)`;
            db.run(sql, [data.title, data.price], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM pubg WHERE id = ?`, [id], function (err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}

export default Pubg;
