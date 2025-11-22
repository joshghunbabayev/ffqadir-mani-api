import db from "../database/connection.js";

class Fan {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM fan", (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO fan (title, image, price) VALUES (?, ?, ?)";
            db.run(sql, [data.title, data.image, data.price], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM fan WHERE id = ?", [id], function (err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}

export default Fan;
