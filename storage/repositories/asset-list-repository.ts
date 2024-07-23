import { SQLiteDatabase } from "expo-sqlite";
import { AssetListDTO, AssetListItemDTO } from "../models/asset-lists";

export async function createAssetListsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS asset_lists (id INTEGER PRIMARY KEY NOT NULL, dateCreated TEXT NOT NULL, dateUpdated TEXT);
    INSERT INTO asset_lists (dateCreated) VALUES ('1721416660493');
    `);
}

export async function createAssetListItemsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS asset_list_items (id INTEGER PRIMARY KEY NOT NULL, listId INTEGER NOT NULL, assetId INTEGER NOT NULL,
    previousLocationId INTEGER NOT NULL, currentLocationId INTEGER NOT NULL, previousEmployeeId INTEGER NOT NULL, currentEmployeeId INTEGER NOT NULL);
    INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (1, 1, 1, 2, 1, 2);
    INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (1, 2, 2, 2, 2, 2);
    `);
}

export async function getAllAssetLists(
  db: SQLiteDatabase
): Promise<AssetListDTO[]> {
  var lists = await db.getAllAsync<AssetListDTO>("SELECT * FROM asset_lists");
  var result: AssetListDTO[] = [];

  for (let i = 0; i < lists.length; i++) {
    var listItems = await db.getAllAsync<AssetListItemDTO>(
      `SELECT a.*, pl.name as previousLocationName, cl.name as currentLocationName, 
        CONCAT(pe.firstName, ' ', pe.lastName) as previousEmployeeName, CONCAT(ce.firstName, ' ', ce.lastName) as currentEmployeeName 
        FROM asset_list_items a 
        INNNER JOIN locations pl ON pl.id = a.previousLocationId 
        INNNER JOIN locations cl ON cl.id = a.currentLocationId 
        INNNER JOIN employees pe ON pe.id = a.previousEmployeeId 
        INNNER JOIN employees ce ON ce.id = a.currentEmployeeId 
      WHERE a.listId = ?`,
      [lists[i].id]
    );
    result.push({ ...lists[i], items: listItems });
  }

  return result;
}
