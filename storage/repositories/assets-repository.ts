import { SQLiteDatabase } from "expo-sqlite";
import {
  AssetDetailsDTO,
  AssetDTO,
  CreateAssetDTO,
  UpdateAssetDTO,
} from "../models/assets";

interface AssetEntity {
  id: number;
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  locationId: number;
  image?: string;
  dateCreated: string;
}

interface AssetDetailsEntity extends AssetEntity {
  employeeName: string;
  locationName: string;
  locationLatitude: number;
  locationLongitude: number;
}

export async function createAssetsTable(db: SQLiteDatabase) {
  await db.execAsync(`
          PRAGMA journal_mode = 'wal';
          CREATE TABLE IF NOT EXISTS assets (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT,
          barcode TEXT NOT NULL, price DECIMAL(12,4) NOT NULL, employeeId INTEGER NOT NULL, locationId INTEGER NOT NULL, dateCreated TEXT NOT NULL);
          INSERT INTO assets (name, barcode, price, employeeId, locationId, dateCreated) VALUES ('Laptop', '1234567890', 999.49, 1, 1, '1721416620493');
          `);
}

export async function getAllAssets(db: SQLiteDatabase): Promise<AssetDTO[]> {
  var result = await db.getAllAsync<AssetEntity>("SELECT * FROM assets");
  return result.map((x) => {
    return { ...x };
  });
}

export async function getAssetsByLocation(
  db: SQLiteDatabase,
  locationId: number
): Promise<AssetDTO[]> {
  var result = await db.getAllAsync<AssetEntity>(
    "SELECT * FROM assets WHERE locationId = ?",
    [locationId]
  );
  return result.map((x) => {
    return { ...x };
  });
}

export async function searchForAssets(
  db: SQLiteDatabase,
  query: string
): Promise<AssetDTO[]> {
  const searchParam = `%${query}%`;
  var result = await db.getAllAsync<AssetEntity>(
    "SELECT * FROM assets WHERE name LIKE ? OR barcode LIKE ?",
    [searchParam, searchParam]
  );
  return result.map((x) => {
    return { ...x };
  });
}

export async function getAssetById(
  db: SQLiteDatabase,
  id: number
): Promise<AssetDTO | null> {
  var result = await db.getFirstSync<AssetEntity>(
    "SELECT * FROM assets WHERE id = ?",
    [id]
  );
  return result ? { ...result } : null;
}

export async function getAssetDetails(
  db: SQLiteDatabase,
  id: number
): Promise<AssetDetailsDTO | null> {
  var result = await db.getFirstSync<AssetDetailsEntity>(
    `SELECT a.id, a.name, a.description, a.barcode, a.price, a.dateCreated, e.id as employeeId, CONCAT(e.firstName, ' ', e.lastName) as employeeName, 
    l.id as locationId, l.name as locationName, l.latitude as locationLatitude, l.longitude as locationLongitude 
    FROM assets a INNER JOIN employees e ON a.employeeId = e.id INNER JOIN locations l ON a.locationId = l.id WHERE a.id = ?`,
    [id]
  );
  return result ? { ...result } : null;
}

export async function createAsset(
  db: SQLiteDatabase,
  asset: CreateAssetDTO
): Promise<AssetDTO> {
  const result = await db.runAsync(
    "INSERT INTO assets (name, description, barcode, price, employeeId, locationId, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      asset.name,
      asset.description ?? null,
      asset.barcode,
      asset.price,
      asset.employeeId,
      asset.locationId,
      asset.dateCreated,
    ]
  );

  const assetId = result.lastInsertRowId;
  if (result.changes == 1) return { id: assetId, ...asset };

  throw new Error(
    `Unable to insert record for a asset with name ${asset.name}, barcode: ${asset.barcode}`
  );
}

export async function updateAsset(
  db: SQLiteDatabase,
  asset: UpdateAssetDTO
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE assets SET name = ?, description = ?, barcode = ?, price = ?, employeeId = ?, locationId = ? WHERE id = ?",
    [
      asset.name,
      asset.description ?? null,
      asset.barcode,
      asset.price,
      asset.employeeId,
      asset.locationId,
      asset.id,
    ]
  );
  return result.changes == 1;
}

export async function deleteAsset(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  const result = await db.runAsync("DELETE FROM assets WHERE id = ?", [id]);

  return result.changes == 1;
}
