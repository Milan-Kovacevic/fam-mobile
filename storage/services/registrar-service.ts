import { SQLiteDatabase } from "expo-sqlite";
import {
  addAssetListItem,
  createAssetList,
  deleteAssetList,
  deleteAssetListItem,
  getAllAssetLists,
  getAssetListItemDetails,
  searchAssetLists,
  updateAssetList,
  updateAssetListItem,
} from "../repositories/asset-list-repository";
import {
  AddAssetListItemDTO,
  UpdateAssetListItemDTO,
} from "../models/asset-lists";
import { delay } from "@/utils/util";
import { updateAssetDetails } from "../repositories/assets-repository";

/* ASSET REGISTRAR */
export async function getAssetRegistrar(db: SQLiteDatabase) {
  return await getAllAssetLists(db);
}

export async function searchAssetRegistrar(db: SQLiteDatabase, query: string) {
  return await searchAssetLists(db, query);
}

export async function createEmptyRegistrarItem(db: SQLiteDatabase) {
  return await createAssetList(db, {
    dateCreated: new Date().getTime().toString(),
  });
}

export async function deleteRegistrarItem(db: SQLiteDatabase, id: number) {
  return await deleteAssetList(db, id);
}

/* INVENTORY LIST (REGISTRAR ITEM) */
export async function getInventoryListItemDetails(
  db: SQLiteDatabase,
  id: number
) {
  return await getAssetListItemDetails(db, id);
}

export async function addInventoryListItem(
  db: SQLiteDatabase,
  request: AddAssetListItemDTO
) {
  await delay(750);
  await addAssetListItem(db, request);
  await updateAssetList(db, {
    id: request.listId,
    dateUpdated: new Date().getTime().toString(),
  });
  await updateAssetDetails(db, {
    id: request.assetId,
    locationId: request.currentLocationId,
    employeeId: request.currentEmployeeId,
  });
}

export async function updateInventoryListItem(
  db: SQLiteDatabase,
  request: UpdateAssetListItemDTO & { listId: number }
) {
  await delay(750);
  await updateAssetListItem(db, request);
  await updateAssetList(db, {
    id: request.listId,
    dateUpdated: new Date().getTime().toString(),
  });
  await updateAssetDetails(db, {
    id: request.assetId,
    locationId: request.currentLocationId,
    employeeId: request.currentEmployeeId,
  });
}

export async function deleteInventoryListItem(
  db: SQLiteDatabase,
  listId: number,
  itemId: number
) {
  var isSuccess = await deleteAssetListItem(db, itemId);
  if (isSuccess)
    await updateAssetList(db, {
      id: listId,
      dateUpdated: new Date().getTime().toString(),
    });

  return isSuccess;
}
