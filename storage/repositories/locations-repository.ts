import { SQLiteDatabase } from "expo-sqlite";
import {
  CreateLocationDTO,
  LocationDTO,
  UpdateLocationDTO,
} from "../models/locations";

interface LocationEntity {
  id: number;
  name: string;
}

export async function createLocationsTable(db: SQLiteDatabase) {
  await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE);
        INSERT INTO locations (name) VALUES ('Banja Luka');
        INSERT INTO locations (name) VALUES ('Laktasi');
        INSERT INTO locations (name) VALUES ('Gradiska');
        `);
}

export async function getAllLocations(
  db: SQLiteDatabase
): Promise<LocationDTO[]> {
  var result = await db.getAllAsync<LocationEntity>("SELECT * FROM locations");
  return result.map((x) => {
    return { id: x.id, name: x.name };
  });
}

export async function getLocationById(
  db: SQLiteDatabase,
  id: number
): Promise<LocationDTO | null> {
  var result = await db.getFirstSync<LocationEntity>(
    "SELECT * FROM locations WHERE id = ?",
    [id]
  );
  return result ? { id: result?.id, name: result?.name } : null;
}

export async function getLocationsByName(
  db: SQLiteDatabase,
  query: string
): Promise<LocationDTO[]> {
  const searchParam = `%${query}%`;
  var result = await db.getAllAsync<LocationEntity>(
    "SELECT * FROM locations WHERE name LIKE ?",
    [searchParam]
  );
  return result.map((x) => {
    return { id: x.id, name: x.name };
  });
}

export async function createLocation(
  db: SQLiteDatabase,
  location: CreateLocationDTO
): Promise<LocationDTO> {
  const result = await db.runAsync("INSERT INTO locations (name) VALUES (?)", [
    location.name,
  ]);

  const locationId = result.lastInsertRowId;
  if (result.changes == 1) return { id: locationId, name: location.name };

  throw new Error(
    `Unable to insert record for a location with name ${location.name}`
  );
}

export async function updateLocation(
  db: SQLiteDatabase,
  location: UpdateLocationDTO
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE locations SET name = ? WHERE id = ?",
    [location.name, location.id]
  );
  return result.changes == 1;
}

export async function deleteLocation(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  const result = await db.runAsync("DELETE FROM locations WHERE id = ?", [id]);

  return result.changes == 1;
}
