const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    password: 'NjtYIYwFMhQMWFbQIGItMEpjfGAZhGlY',
    database: 'railway',
    port: 51272
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

module.exports = db;
