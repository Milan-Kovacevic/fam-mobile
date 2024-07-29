import { View } from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormActionButton from "@/components/shared/form/FormActionButton";
import { SheetManager } from "react-native-actions-sheet";
import { LocationDTO } from "@/storage/models/locations";
import { EmployeeDTO } from "@/storage/models/employees";
import FormSelectInput from "@/components/shared/form/FormSelectInput";
import BarCodeScanner from "../../shared/modal/BarCodeScanner";
import { AssetDetailsDTO, AssetDTO } from "@/storage/models/assets";
import { Text } from "@/components/ui/Text";
import FormSwitch from "@/components/shared/form/FormSwitch";
import { useTranslation } from "react-i18next";

export type RegistrarItemFormType = {
  asset: {
    id: number;
    label: string;
  };
  previousLocation: {
    id: number;
    label: string;
  };
  currentLocation: {
    id: number;
    label: string;
  };
  previousEmployee: {
    id: number;
    label: string;
  };
  currentEmployee: {
    id: number;
    label: string;
  };
  isSameLocation: boolean;
  isSameEmployee: boolean;
};

interface ManageRegistrarFormProps {
  onSubmit: (fromData: RegistrarItemFormType) => void;
  onBarcodeScanned: (code: string) => Promise<AssetDetailsDTO | null>;
  registrarItem?: RegistrarItemFormType;
  loading: boolean;
  scanCode?: boolean;
}

const ManageRegistrarForm = (props: ManageRegistrarFormProps) => {
  const { onSubmit, loading, registrarItem, scanCode, onBarcodeScanned } =
    props;
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = useState(scanCode ?? false);
  const [sameLocation, setSameLocation] = useState(
    registrarItem?.isSameLocation
  );
  const [sameEmployee, setSameEmployee] = useState(
    registrarItem?.isSameEmployee
  );

  const formSchema = z
    .object({
      asset: z
        .object(
          {
            id: z.coerce.number(),
            label: z.coerce.string(),
          },
          { required_error: t("registrar.form.assetRequired") }
        )
        .required(),
      previousLocation: z
        .object(
          {
            id: z.coerce.number(),
            label: z.coerce.string(),
          },
          { required_error: t("registrar.form.currentLocationRequired") }
        )
        .required(),
      currentLocation: z
        .object(
          {
            id: z.coerce.number(),
            label: z.coerce.string(),
          },
          { required_error: t("registrar.form.newLocationRequired") }
        )
        .optional(),
      isSameLocation: z.boolean().optional(),
      previousEmployee: z
        .object(
          {
            id: z.coerce.number(),
            label: z.coerce.string(),
          },
          { required_error: t("registrar.form.currentEmployeeRequired") }
        )
        .required(),
      isSameEmployee: z.boolean().optional(),
      currentEmployee: z
        .object(
          {
            id: z.coerce.number(),
            label: z.coerce.string(),
          },
          { required_error: t("registrar.form.newEmployeeRequired") }
        )
        .optional(),
    })
    .refine(
      (data) => {
        return (
          (!data.isSameLocation && data.currentLocation != undefined) ||
          (data.isSameLocation && data.currentLocation == undefined)
        );
      },
      {
        message: t("registrar.form.newLocationRequired"),
        path: ["currentLocation"],
      }
    )
    .refine(
      (data) => {
        return (
          (!data.isSameEmployee && data.currentEmployee != undefined) ||
          (data.isSameEmployee && data.currentEmployee == undefined)
        );
      },
      {
        message: t("registrar.form.newEmployeeRequired"),
        path: ["currentEmployee"],
      }
    );

  var initialValues = {
    asset: registrarItem?.asset ?? undefined,
    previousLocation: registrarItem?.previousLocation ?? undefined,
    currentLocation: registrarItem?.isSameLocation
      ? undefined
      : registrarItem?.currentLocation ?? undefined,
    previousEmployee: registrarItem?.previousEmployee ?? undefined,
    currentEmployee: registrarItem?.isSameEmployee
      ? undefined
      : registrarItem?.currentEmployee ?? undefined,
    isSameLocation: registrarItem?.isSameLocation ?? false,
    isSameEmployee: registrarItem?.isSameEmployee ?? false,
  };

  const { control, handleSubmit, setValue } = useForm<RegistrarItemFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmitted(data: RegistrarItemFormType) {
    onSubmit(data);
  }

  async function handleBarcodeScanned(data: string) {
    var asset = await onBarcodeScanned(data);
    setShowScanner(false);
    if (!asset) return;

    setValue(
      "asset",
      { id: asset.id, label: asset.name },
      { shouldValidate: true }
    );
    setValue(
      "previousLocation",
      {
        id: asset.locationId,
        label: asset.locationName,
      },
      { shouldValidate: true }
    );
    setValue(
      "previousEmployee",
      {
        id: asset.employeeId,
        label: asset.employeeName,
      },
      { shouldValidate: true }
    );
    handleChangeSameLocation(true);
    handleChangeSameEmployee(true);
  }

  if (showScanner) {
    return (
      <BarCodeScanner
        onCanceled={() => setShowScanner(false)}
        onBarCodeRead={handleBarcodeScanned}
      />
    );
  }

  function onOpenAssetsSheet() {
    handleOpenSheet("assets-sheet", {
      onAssetSelected: handleAssetSelected,
    });
  }

  function onOpenLocationsSheet(current: boolean) {
    handleOpenSheet("locations-sheet", {
      onLocationSelected: (location: LocationDTO) =>
        handleLocationSelected(
          current ? "currentLocation" : "previousLocation",
          location
        ),
    });
  }
  function onOpenEmployeesSheet(current: boolean) {
    handleOpenSheet("employees-sheet", {
      onEmployeeSelected: (employee: EmployeeDTO) =>
        handleEmployeeSelected(
          current ? "currentEmployee" : "previousEmployee",
          employee
        ),
    });
  }
  function handleOpenSheet(sheetName: string, payload: any) {
    SheetManager.show(sheetName, {
      payload: payload,
    });
  }

  function handleAssetSelected(asset?: AssetDTO) {
    if (asset) {
      setValue(
        "asset",
        { id: asset.id, label: asset.name },
        { shouldValidate: true }
      );
      SheetManager.hide("assets-sheet");
    }
  }

  function handleLocationSelected(
    formField: keyof RegistrarItemFormType,
    location?: LocationDTO
  ) {
    if (location) {
      setValue(
        formField,
        { id: location.id, label: location.name },
        { shouldValidate: true }
      );
      SheetManager.hide("locations-sheet");
    }
  }

  function handleEmployeeSelected(
    formField: keyof RegistrarItemFormType,
    employee?: EmployeeDTO
  ) {
    if (employee) {
      setValue(
        formField,
        {
          id: employee.id,
          label: `${employee.firstName} ${employee.lastName}`,
        },
        { shouldValidate: true }
      );
      SheetManager.hide("employees-sheet");
    }
  }

  function handleChangeSameLocation(value: boolean) {
    setSameLocation(value);
    setValue("isSameLocation", value, { shouldValidate: true });
  }
  function handleChangeSameEmployee(value: boolean) {
    setSameEmployee(value);
    setValue("isSameEmployee", value, { shouldValidate: true });
  }

  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-2">
        <View className="flex-1 flex-row w-full">
          <FormSelectInput
            control={control}
            title={t("registrar.form.assetLabel")}
            name="asset"
            placeholder={t("registrar.form.assetPlaceholder")}
            className="flex-1"
            extractValue={(value) => value?.label ?? ""}
            onPressed={onOpenAssetsSheet}
          />
          <FormActionButton
            onButtonPressed={() => setShowScanner(true)}
            icon="qr-code-scanner"
            variant="material"
            className="mt-[18px] py-1.5 px-2.5 ml-1"
          />
        </View>

        <FormSelectInput
          control={control}
          title={t("registrar.form.currentLocationLabel")}
          name="previousLocation"
          placeholder={t("registrar.form.currentLocationPlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={() => onOpenLocationsSheet(false)}
        />
        <FormSelectInput
          control={control}
          disabled={sameLocation}
          title={t("registrar.form.newLocationLabel")}
          name="currentLocation"
          placeholder={t("registrar.form.newLocationPlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={() => onOpenLocationsSheet(true)}
        />
        <View className="flex-row items-center p-0">
          <FormSwitch
            name="isSameLocation"
            className=""
            control={control}
            onChange={handleChangeSameLocation}
          />
          <Text variant="neutral" className="text-xs ml-0.5">
            {t("registrar.form.sameLocation")}
          </Text>
        </View>
        <FormSelectInput
          control={control}
          title={t("registrar.form.currentEmployeeLabel")}
          name="previousEmployee"
          placeholder={t("registrar.form.currentEmployeePlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={() => onOpenEmployeesSheet(false)}
        />

        <FormSelectInput
          control={control}
          disabled={sameEmployee}
          title={t("registrar.form.newEmployeeLabel")}
          name="currentEmployee"
          placeholder={t("registrar.form.newEmployeePlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={() => onOpenEmployeesSheet(true)}
        />
        <View className="flex-row items-center p-0">
          <FormSwitch
            name="isSameEmployee"
            className=""
            control={control}
            onChange={handleChangeSameEmployee}
          />
          <Text variant="neutral" className="text-xs ">
            {t("registrar.form.sameEmployee")}
          </Text>
        </View>
      </View>

      <Button
        variant="primary"
        text={t("common.submitButtonLabel")}
        onPressed={handleSubmit(handleFormSubmitted)}
        className="mt-6"
        loading={loading}
      />
    </View>
  );
};

export default ManageRegistrarForm;
