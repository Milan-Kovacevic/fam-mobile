import { SQLiteDatabase } from "expo-sqlite";
import {
  CreateLocationDTO,
  LocationDTO,
  UpdateLocationDTO,
} from "../models/locations";
import {
  CreateEmployeeDTO,
  EmployeeDTO,
  UpdateEmployeeDTO,
} from "../models/employees";

interface EmployeeEntity {
  id: number;
  firstName: string;
  lastName: string;
}

export async function createEmployeesTable(db: SQLiteDatabase) {
  await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL);
        INSERT INTO employees (firstName, lastName) VALUES ('Marko', 'Markovic');
        INSERT INTO employees (firstName, lastName) VALUES ('Janko', 'Jankovic');
        `);
}

export async function getAllEmployees(
  db: SQLiteDatabase
): Promise<EmployeeDTO[]> {
  var result = await db.getAllAsync<EmployeeEntity>("SELECT * FROM employees");
  return result.map((x) => {
    return { id: x.id, firstName: x.firstName, lastName: x.lastName };
  });
}

export async function getEmployeeById(
  db: SQLiteDatabase,
  id: number
): Promise<EmployeeDTO | null> {
  var result = await db.getFirstSync<EmployeeEntity>(
    "SELECT * FROM employees WHERE id = ?",
    [id]
  );
  return result
    ? { id: result.id, firstName: result.firstName, lastName: result.lastName }
    : null;
}

export async function getEmployeesByName(
  db: SQLiteDatabase,
  query: string
): Promise<EmployeeDTO[]> {
  const searchParam = `%${query}%`;
  var result = await db.getAllAsync<EmployeeEntity>(
    "SELECT * FROM employees WHERE firstName LIKE ? OR lastName LIKE ? OR concat(firstName, ' ', lastName) LIKE ?",
    [searchParam, searchParam, searchParam]
  );
  return result.map((x) => {
    return { id: x.id, firstName: x.firstName, lastName: x.lastName };
  });
}

export async function createEmployee(
  db: SQLiteDatabase,
  employee: CreateEmployeeDTO
): Promise<EmployeeDTO> {
  const result = await db.runAsync(
    "INSERT INTO employees (firstName, lastName) VALUES (?, ?)",
    [employee.firstName, employee.lastName]
  );

  const employeeId = result.lastInsertRowId;
  if (result.changes == 1)
    return {
      id: employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
    };

  throw new Error(
    `Unable to insert record for a employee with name '${employee.firstName} ${employee.lastName}'`
  );
}

export async function updateEmployee(
  db: SQLiteDatabase,
  employee: UpdateEmployeeDTO
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE employees SET firstName = ? , lastName = ? WHERE id = ?",
    [employee.firstName, employee.lastName, employee.id]
  );
  return result.changes == 1;
}

export async function deleteEmployee(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  const result = await db.runAsync("DELETE FROM employees WHERE id = ?", [id]);
  return result.changes == 1;
}
