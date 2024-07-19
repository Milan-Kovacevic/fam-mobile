import { SQLiteDatabase } from "expo-sqlite";
import { AssetDTO, CreateAssetDTO } from "../models/assets";

interface AssetEntity {
  id: number;
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  locationId: number;
  image?: string;
  dateCreated: number;
}

export async function createAssetsTable(db: SQLiteDatabase) {
  await db.execAsync(`
          PRAGMA journal_mode = 'wal';
          CREATE TABLE IF NOT EXISTS assets (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT,
          barcode TEXT NOT NULL, price DECIMAL(12,4) NOT NULL, employeeId INTEGER NOT NULL, locationId INTEGER NOT NULL, dateCreated INTEGER NOT NULL);
          INSERT INTO assets (name, barcode, price, employeeId, locationId, dateCreated) VALUES ('Laptop', '1234567890', 14.49, 1, 1, 1721416620493);
          `);
}

export async function getAllAssets(db: SQLiteDatabase): Promise<AssetDTO[]> {
  var result = await db.getAllAsync<AssetEntity>("SELECT * FROM assets");
  return result.map((x) => {
    return { ...x };
  });
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
