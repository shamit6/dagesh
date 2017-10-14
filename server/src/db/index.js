import sqlite from 'sqlite3'
import path from 'path'

const DB_FILE = path.join(__dirname,'../../../db/dagesh.db')

// open the database
let db = new sqlite.Database(DB_FILE, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }else{
    console.log('Connected to the database.');
  }
});


export default db
