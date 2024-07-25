import React from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import {
  createLocationsTable,
  seedLocationsTable,
} from "./repositories/locations-repository";
import {
  createEmployeesTable,
  seedEmployeesTable,
} from "./repositories/employees-repository";
import {
  createAssetsTable,
  seedAssetsTable,
} from "./repositories/assets-repository";
import {
  createAssetListItemsTable,
  createAssetListsTable,
  seedAssetListItemsTable,
  seedAssetListsTable,
} from "./repositories/asset-list-repository";

export const DATABASE_NAME = "fam.db";
export const DATABASE_VERSION = 1;

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
    await createAssetsTable(db);
    await createAssetListsTable(db);
    await createAssetListItemsTable(db);
    await seedLocationsTable(db);
    await seedEmployeesTable(db);
    await seedAssetsTable(db);
    await seedAssetListsTable(db);
    await seedAssetListItemsTable(db);
    console.log("Applied database migration");
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function clearDatabase(db: SQLiteDatabase) {
  await db.execAsync("DELETE FROM locations");
  await db.execAsync("DELETE FROM employees");
  await db.execAsync("DELETE FROM assets");
  await db.execAsync("DELETE FROM asset_lists");
  await db.execAsync("DELETE FROM asset_list_items");
}
