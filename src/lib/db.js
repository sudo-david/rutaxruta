// src/lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',      // Tu usuario de MySQL Workbench
  password: 'david1011', // Tu contraseña de MySQL
  database: 'rutaxruta',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;