import { SQLiteDatabase } from "expo-sqlite";
import { StatItem } from "../models/dashboard";

export async function getDashboardOverviewStats(
  db: SQLiteDatabase,
  names: string[]
): Promise<StatItem[]> {
  var inventoryStats = await db.getFirstAsync<StatItem>(
    `SELECT COUNT(a.id) as total, SUM(a.price) as value from assets a`
  );
  var locationsStats = await db.getFirstAsync<StatItem>(
    `SELECT COUNT(l.id) as total from locations l`
  );
  var employeesStats = await db.getFirstAsync<StatItem>(
    `SELECT COUNT(e.id) as total from employees e`
  );
  var registrarStats = await db.getFirstAsync<StatItem>(
    `SELECT COUNT(i.id) as total, SUM(a.price) as value from asset_list_items i INNER JOIN assets a ON a.id = i.assetId`
  );

  return [
    {
      variant: "primary",
      icon: "inventory",
      iconVariant: "material",
      name: names[0],
      href: "/assets",
      total: inventoryStats?.total ?? 0,
      value: inventoryStats?.value ?? 0,
    },
    {
      variant: "secondary",
      icon: "location-outline",
      iconVariant: "ionicon",
      name: names[1],
      href: "/locations",
      total: locationsStats?.total ?? 0,
      value: locationsStats?.value,
    },
    {
      variant: "secondary",
      icon: "user",
      iconVariant: "feather",
      name: names[2],
      href: "/employees",
      total: employeesStats?.total ?? 0,
      value: employeesStats?.value,
    },
    {
      variant: "primary",
      icon: "list",
      iconVariant: "ionicon",
      name: names[3],
      href: "/registrar",
      total: registrarStats?.total ?? 0,
      value: registrarStats?.value ?? 0,
    },
  ];
}
