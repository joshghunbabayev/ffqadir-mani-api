import sqlite3 from "sqlite3";

const dbPath = ""; 

const db = new sqlite3.Database("./database/main.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database at", dbPath);
    }
});

export default db;