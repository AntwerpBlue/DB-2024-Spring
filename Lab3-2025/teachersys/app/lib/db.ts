import mysql from 'mysql2/promise';

let cachedPool: mysql.Pool;

export async function connectToDB() {
  if (cachedPool) return cachedPool;
  
  cachedPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5
  });
  
  return cachedPool;
}