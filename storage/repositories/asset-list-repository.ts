import { SQLiteDatabase } from "expo-sqlite";
import {
  AddAssetListItemDTO,
  AssetListDTO,
  AssetListItemDTO,
  CreateAssetListDTO,
  UpdateAssetListDTO,
  UpdateAssetListItemDTO,
} from "../models/asset-lists";

export async function createAssetListsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS asset_lists (id INTEGER PRIMARY KEY NOT NULL, dateCreated TEXT NOT NULL, dateUpdated TEXT);
    `);
}

export async function seedAssetListsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    INSERT INTO asset_lists (dateCreated) VALUES ('1721416660493');
    INSERT INTO asset_lists (dateCreated) VALUES ('1721416660493');
    `);
}

export async function createAssetListItemsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS asset_list_items (id INTEGER PRIMARY KEY NOT NULL, listId INTEGER NOT NULL, assetId INTEGER NOT NULL,
    previousLocationId INTEGER NOT NULL, currentLocationId INTEGER NOT NULL, previousEmployeeId INTEGER NOT NULL, currentEmployeeId INTEGER NOT NULL,
    FOREIGN KEY (listId) REFERENCES asset_lists(id) ON DELETE CASCADE, FOREIGN KEY (assetId) REFERENCES assets(id) ON DELETE CASCADE, 
    FOREIGN KEY (previousLocationId) REFERENCES locations(id) ON DELETE CASCADE, FOREIGN KEY (currentLocationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (previousEmployeeId) REFERENCES employees(id) ON DELETE CASCADE, FOREIGN KEY (currentEmployeeId) REFERENCES employees(id) ON DELETE CASCADE);
    `);
}

export async function seedAssetListItemsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (1, 1, 1, 2, 1, 2);
    INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (1, 2, 2, 2, 2, 2);
    INSERT INTO asset_list_items (listId, assetId, previousLocationId, currentLocationId, previousEmployeeId, currentEmployeeId) VALUES (2, 3, 2, 3, 3, 3);
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

export async function searchAssetLists(
  db: SQLiteDatabase,
  query: string
): Promise<AssetListDTO[]> {
  var lists = await db.getAllAsync<AssetListDTO>(`SELECT l.* FROM asset_lists l
    INNER JOIN asset_list_items ai ON ai.listId = l.id 
    INNER JOIN assets a ON a.id = ai.assetId 
    INNER JOIN locations pl ON pl.id = ai.previousLocationId 
    INNER JOIN locations cl ON cl.id = ai.currentLocationId 
    INNER JOIN employees pe ON pe.id = ai.previousEmployeeId 
    INNER JOIN employees ce ON ce.id = ai.currentEmployeeId GROUP BY l.id
    `);

  var result: AssetListDTO[] = [];
  const searchParam = `%${query}%`;
  for (let i = 0; i < lists.length; i++) {
    var listItems = await db.getAllAsync<AssetListItemDTO>(
      `SELECT ai.*, a.name as assetName, pl.name as previousLocationName, cl.name as currentLocationName, 
        CONCAT(pe.firstName, ' ', pe.lastName) as previousEmployeeName, CONCAT(ce.firstName, ' ', ce.lastName) as currentEmployeeName 
        FROM asset_list_items ai 
        INNER JOIN assets a ON a.id = ai.assetId 
        INNER JOIN locations pl ON pl.id = ai.previousLocationId 
        INNER JOIN locations cl ON cl.id = ai.currentLocationId 
        INNER JOIN employees pe ON pe.id = ai.previousEmployeeId 
        INNER JOIN employees ce ON ce.id = ai.currentEmployeeId 
      WHERE ai.listId = ? AND (a.name LIKE ? OR pl.name LIKE ? OR cl.name LIKE ? OR concat(pe.firstName, ' ', pe.lastName) LIKE ? OR concat(ce.firstName, ' ', ce.lastName) LIKE ?)`,
      [
        lists[i].id,
        searchParam,
        searchParam,
        searchParam,
        searchParam,
        searchParam,
      ]
    );
    if (listItems.length > 0) result.push({ ...lists[i], items: listItems });
  }

  return result;
}

export async function createAssetList(
  db: SQLiteDatabase,
  request: CreateAssetListDTO
): Promise<AssetListDTO> {
  const result = await db.runAsync(
    "INSERT INTO asset_lists (dateCreated) VALUES (?)",
    [request.dateCreated]
  );

  const listId = result.lastInsertRowId;
  if (result.changes == 1) return { id: listId, ...request, items: [] };

  throw new Error(`Unable to insert record for a asset list`);
}

export async function updateAssetList(
  db: SQLiteDatabase,
  request: UpdateAssetListDTO
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE asset_lists SET dateUpdated = ? WHERE id = ?",
    [request.dateUpdated, request.id]
  );

  return result.changes == 1;
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

export async function getAssetListItemDetails(
  db: SQLiteDatabase,
  id: number
): Promise<AssetListItemDTO | null> {
  var result = await db.getFirstAsync<AssetListItemDTO>(
    `SELECT a.*, aa.name as assetName, pl.name as previousLocationName, cl.name as currentLocationName, 
        CONCAT(pe.firstName, ' ', pe.lastName) as previousEmployeeName, CONCAT(ce.firstName, ' ', ce.lastName) as currentEmployeeName 
        FROM asset_list_items a 
        INNER JOIN assets aa ON aa.id = a.assetId 
        INNER JOIN locations pl ON pl.id = a.previousLocationId 
        INNER JOIN locations cl ON cl.id = a.currentLocationId 
        INNER JOIN employees pe ON pe.id = a.previousEmployeeId 
        INNER JOIN employees ce ON ce.id = a.currentEmployeeId 
      WHERE a.id = ?`,
    [id]
  );
  return result;
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

export async function updateAssetListItem(
  db: SQLiteDatabase,
  request: UpdateAssetListItemDTO
) {
  await db.runAsync(
    "UPDATE asset_list_items SET assetId = ?, previousLocationId = ?, currentLocationId = ?, previousEmployeeId = ?, currentEmployeeId = ? WHERE id = ?",
    [
      request.assetId,
      request.previousLocationId,
      request.currentLocationId,
      request.previousEmployeeId,
      request.currentEmployeeId,
      request.id,
    ]
  );
}

export async function getAllAssetListItems(db: SQLiteDatabase) {
  const result = await db.getAllAsync("SELECT * from asset_list_items");

  return result;
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
