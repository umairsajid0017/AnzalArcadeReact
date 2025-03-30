import mysql from 'mysql2/promise';

// Create a MySQL connection
declare global {
  var db: mysql.Pool | undefined;
}

// This approach ensures we don't create a new connection for every request
export const db = global.db || mysql.createPool(process.env.MYSQL_DATABASE_URL as string);

if (process.env.NODE_ENV !== 'production') {
  global.db = db;
}