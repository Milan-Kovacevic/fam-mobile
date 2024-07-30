import { SQLiteDatabase } from "expo-sqlite";
import { CreateAssetDTO, UpdateAssetDTO } from "../models/assets";
import * as FileSystem from "expo-file-system";
import {
  createAsset,
  deleteAsset,
  getAssetById,
  updateAsset,
} from "../repositories/assets-repository";

export async function createFixedAsset(
  db: SQLiteDatabase,
  asset: CreateAssetDTO
) {
  const imageName = `${asset.dateCreated}.png`;
  var imagePath: string | undefined;
  if (asset.image) {
    imagePath = FileSystem.documentDirectory + imageName;
    await FileSystem.copyAsync({
      from: asset.image,
      to: imagePath,
    });
  }
  createAsset(db, { ...asset, image: imagePath });
}

export async function updateFixedAsset(
  db: SQLiteDatabase,
  asset: UpdateAssetDTO
) {
  var entity = await getAssetById(db, asset.id);
  if (!entity) return;

  if (entity.image && entity.image != asset.image) {
    const fileExists = await FileSystem.getInfoAsync(entity.image);

    if (fileExists.exists) {
      await FileSystem.deleteAsync(entity.image);
    }
  }

  var imagePath: string | undefined;
  if (asset.image) {
    const newImageName = `${new Date().getTime().toString()}.png`;
    imagePath = FileSystem.documentDirectory + newImageName;

    await FileSystem.copyAsync({
      from: asset.image,
      to: imagePath,
    });
  }

  updateAsset(db, { ...asset, image: imagePath });
}

export async function deleteFixedAsset(db: SQLiteDatabase, id: number) {
  var entity = await getAssetById(db, id);
  if (!entity) return false;

  if (entity.image) {
    const fileExists = await FileSystem.getInfoAsync(entity.image);

    if (fileExists.exists) {
      await FileSystem.deleteAsync(entity.image);
    }
  }

  return await deleteAsset(db, id);
}
