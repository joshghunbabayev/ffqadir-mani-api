import db from "../database/connection.js";

class Wolt {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM wolt", (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO wolt (title, description, image, price) VALUES (?, ?, ?, ?)";
            db.run(sql, [data.title, data.description, data.image, data.price], function(err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM wolt WHERE id = ?", [id], function(err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}

export default Wolt;