export type AssetListDTO = {
  id: number;
  dateCreated: string;
  dateUpdated: string;
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
