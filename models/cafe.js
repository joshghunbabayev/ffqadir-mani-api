import db from "../database/connection.js";

class Cafe {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM cafe", (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO cafe (title, description, price) VALUES (?, ?, ?)";
            db.run(sql, [data.title, data.description, data.price], function(err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM cafe WHERE id = ?", [id], function(err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}

export default Cafe;
