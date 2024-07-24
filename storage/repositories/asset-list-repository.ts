import { SQLiteDatabase } from "expo-sqlite";
import {
  AddAssetListItemDTO,
  AssetListDTO,
  AssetListItemDTO,
  CreateAssetListDTO,
} from "../models/asset-lists";

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
    previousLocationId INTEGER NOT NULL, currentLocationId INTEGER NOT NULL, previousEmployeeId INTEGER NOT NULL, currentEmployeeId INTEGER NOT NULL,
    FOREIGN KEY (listId) REFERENCES asset_lists(id) ON DELETE CASCADE, FOREIGN KEY (assetId) REFERENCES assets(id) ON DELETE CASCADE, 
    FOREIGN KEY (previousLocationId) REFERENCES locations(id) ON DELETE CASCADE, FOREIGN KEY (currentLocationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (previousEmployeeId) REFERENCES employees(id) ON DELETE CASCADE, FOREIGN KEY (currentEmployeeId) REFERENCES employees(id) ON DELETE CASCADE);
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
      `SELECT a.*, aa.name as assetName, pl.name as previousLocationName, cl.name as currentLocationName, 
        CONCAT(pe.firstName, ' ', pe.lastName) as previousEmployeeName, CONCAT(ce.firstName, ' ', ce.lastName) as currentEmployeeName 
        FROM asset_list_items a 
        INNER JOIN assets aa ON aa.id = a.assetId 
        INNER JOIN locations pl ON pl.id = a.previousLocationId 
        INNER JOIN locations cl ON cl.id = a.currentLocationId 
        INNER JOIN employees pe ON pe.id = a.previousEmployeeId 
        INNER JOIN employees ce ON ce.id = a.currentEmployeeId 
      WHERE a.listId = ?`,
      [lists[i].id]
    );
    result.push({ ...lists[i], items: listItems });
  }

  return result;
}

export async function createAssetList(
  db: SQLiteDatabase,
  assetList: CreateAssetListDTO
): Promise<AssetListDTO> {
  const result = await db.runAsync(
    "INSERT INTO asset_lists (dateCreated) VALUES (?)",
    [assetList.dateCreated]
  );

  const listId = result.lastInsertRowId;
  if (result.changes == 1) return { id: listId, ...assetList, items: [] };

  throw new Error(`Unable to insert record for a asset list`);
}

export async function deleteAssetList(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  const result = await db.runAsync("DELETE FROM asset_lists WHERE id = ?", [
    id,
  ]);

  return result.changes == 1;
}

export async function addAssetListItem(
  db: SQLiteDatabase,
  request: AddAssetListItemDTO
) {
  await db.runAsync(
    "INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (?, ?, ?, ?, ?, ?)",
    [
      request.listId,
      request.assetId,
      request.previousLocationId,
      request.currentLocationId,
      request.previousEmployeeId,
      request.currentEmployeeId,
    ]
  );
}

export async function deleteAssetListItem(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  const result = await db.runAsync(
    "DELETE FROM asset_list_items WHERE id = ?",
    [id]
  );

  return result.changes == 1;
}
