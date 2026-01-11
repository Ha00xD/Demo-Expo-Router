import { SQLiteDatabase } from "expo-sqlite";

export const initDb = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS outletStore (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT,
      latitude REAL,
      longitude REAL
    );

    CREATE TABLE IF NOT EXISTS usersInfo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      status TEXT,  
      isSynced INTEGER DEFAULT 0,
      updatedAt TEXT
    );

  `);


};
