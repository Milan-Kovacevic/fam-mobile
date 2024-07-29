import AsyncStorage from "@react-native-async-storage/async-storage";
import { SaveSettingsDTO, SettingsDTO } from "../models/settings";

const SETTINGS_STORAGE_KEY = "fam-settings";

export async function getSettings() {
  const jsonValue = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
  return jsonValue != null ? (JSON.parse(jsonValue) as SettingsDTO) : null;
}

export async function saveSettings(request: SaveSettingsDTO) {
  const jsonValue = JSON.stringify(request);
  await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, jsonValue);
}
