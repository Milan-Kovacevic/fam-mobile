export type AssetDTO = {
  id: number;
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  locationId: number;
  image?: string;
  dateCreated: number;
};

export type AssetDetailsDTO = {
  id: number;
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  employeeName: string;
  locationId: number;
  locationName: string;
  locationLatitude: number;
  locationLongitude: number;
  image?: string;
  dateCreated: number;
};

export type CreateAssetDTO = {
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  locationId: number;
  image?: string;
  dateCreated: number;
};
export type UpdateAssetDTO = {
  id: number;
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employeeId: number;
  locationId: number;
  image?: string;
};
