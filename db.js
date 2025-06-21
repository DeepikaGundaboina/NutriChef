// db.js
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',        // Your MySQL host
  user: 'root',              // Your MySQL username
  password: 'Deepika@4311', // Your MySQL password
  database: 'nutrichef',     // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
