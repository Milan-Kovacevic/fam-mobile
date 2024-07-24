export type AssetListDTO = {
  id: number;
  dateCreated: string;
  dateUpdated?: string;
  items: AssetListItemDTO[];
};

export type AssetListItemDTO = {
  id: number;
  listId: number;
  assetId: number;
  assetName: string;

  previousLocationId: number;
  previousLocationName: string;
  currentLocationId: number;
  currentLocationName: string;

  previousEmployeeId: number;
  previousEmployeeName: string;
  currentEmployeeId: number;
  currentEmployeeName: string;
};

export type CreateAssetListDTO = {
  dateCreated: string;
};

export type AddAssetListItemDTO = {
  listId: number;
  assetId: number;
  previousLocationId: number;
  currentLocationId: number;
  previousEmployeeId: number;
  currentEmployeeId: number;
};
