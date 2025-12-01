import db from "../database/connection.js";

class Invoice {
    // CREATE
    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO invoice
                (title, price, count, description, pubgId, photoUrl, photoPublicId, photoBase64)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.run(
                sql,
                [
                    data.title,
                    data.price,
                    data.count,
                    data.description,
                    data.pubgId,
                    data.photoUrl,
                    data.photoPublicId,
                    data.photoBase64
                ],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID });
                }
            );
        });
    }

    static getAll(status = "active") {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM invoice";
            const params = [];

            if (status) {
                sql += " WHERE status = ?";
                params.push(status);
            }

            db.all(sql, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // GET BY ID
    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM invoice WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    // UPDATE (dynamic fields)
    static update(id, fields) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            if (keys.length === 0) return resolve({ changes: 0 });

            const setPart = keys.map(k => `${k} = ?`).join(", ");
            const sql = `UPDATE invoice SET ${setPart}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

            db.run(sql, [...values, id], function(err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }

    // DELETE
    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM invoice WHERE id = ?", [id], function(err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}

export default Invoice;
