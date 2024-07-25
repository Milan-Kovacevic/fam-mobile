import { SQLiteDatabase } from "expo-sqlite";
import {
  CreateLocationDTO,
  LocationDTO,
  UpdateLocationDTO,
} from "../models/locations";

interface LocationEntity {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export async function createLocationsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE, latitude DECIMAL(12,8) NOT NULL, 
    longitude DECIMAL(12,8) NOT NULL);
  `);
}

export async function seedLocationsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    INSERT INTO locations (name, latitude, longitude) VALUES ('Banja Luka', 44.772182, 17.191000);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Laktasi', 44.906400, 17.301500);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Gradiska', 45.146853, 17.254242);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Čelinac', 44.725256, 17.322873);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Aleksandrovac', 44.968482, 17.318019);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Prnjavor', 44.866936, 17.662874);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Teslić', 44.606888, 17.858124);
    INSERT INTO locations (name, latitude, longitude) VALUES ('Srbac', 45.098527, 17.524289);
    `);
}

export async function getAllLocations(
  db: SQLiteDatabase
): Promise<LocationDTO[]> {
  var result = await db.getAllAsync<LocationEntity>("SELECT * FROM locations");
  return result.map((x) => {
    return { ...x };
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
  return result ? { ...result } : null;
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
    return { ...x };
  });
}

export async function createLocation(
  db: SQLiteDatabase,
  location: CreateLocationDTO
): Promise<LocationDTO> {
  const result = await db.runAsync(
    "INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)",
    [location.name, location.latitude, location.longitude]
  );

  const locationId = result.lastInsertRowId;
  if (result.changes == 1) return { id: locationId, ...location };

  throw new Error(
    `Unable to insert record for a location with name ${location.name}`
  );
}

export async function updateLocation(
  db: SQLiteDatabase,
  location: UpdateLocationDTO
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE locations SET name = ?, latitude = ?, longitude = ? WHERE id = ?",
    [location.name, location.latitude, location.longitude, location.id]
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
