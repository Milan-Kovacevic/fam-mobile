import React from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { createLocationsTable } from "./repositories/locations-repository";
import { createEmployeesTable } from "./repositories/employees-repository";

export const DATABASE_NAME = "fam.db";
export const DATABASE_VERSION = 4;

type StorageProviderProps = {
  children: React.ReactNode;
};
const StorageProvider = ({ children }: StorageProviderProps) => {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
};

export default StorageProvider;

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let dbResult = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (!dbResult) return;
  var currentDbVersion = dbResult.user_version;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await createLocationsTable(db);
    await createEmployeesTable(db);
    console.log("Applied database migration");
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
