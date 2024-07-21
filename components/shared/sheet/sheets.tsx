import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import LocationsSheet from "./LocationsSheet";
import { LocationDTO } from "@/storage/models/locations";
import EmployeesSheet from "./EmployeesSheet";
import { EmployeeDTO } from "@/storage/models/employees";
import { AssetDTO } from "@/storage/models/assets";
import AssetsSheet from "./AssetsSheet";
import { LatLng } from "react-native-maps";

registerSheet("locations-sheet", LocationsSheet);
registerSheet("employees-sheet", EmployeesSheet);
registerSheet("assets-sheet", AssetsSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "locations-sheet": SheetDefinition<{
      payload: {
        onLocationSelected: (location?: LocationDTO) => void;
      };
    }>;
    "employees-sheet": SheetDefinition<{
      payload: {
        onEmployeeSelected: (employee?: EmployeeDTO) => void;
      };
    }>;
    "assets-sheet": SheetDefinition<{
      payload: {
        locationId?: number;
        onAssetSelected: (asset?: AssetDTO) => void;
      };
    }>;
  }
}

export {};
