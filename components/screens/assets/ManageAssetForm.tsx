import { View } from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/shared/form/FormInput";
import FormTextArea from "@/components/shared/form/FormTextArea";
import BarCodeScanner from "../../shared/modal/BarCodeScanner";
import FormImagePicker from "@/components/shared/form/FormImagePicker";
import FormActionButton from "@/components/shared/form/FormActionButton";
import { SheetManager } from "react-native-actions-sheet";
import { LocationDTO } from "@/storage/models/locations";
import { EmployeeDTO } from "@/storage/models/employees";
import FormSelectInput from "@/components/shared/form/FormSelectInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

export type AssetForm = {
  name: string;
  description?: string;
  barcode: string;
  price: number;
  employee: {
    id: number;
    label: string;
  };
  location: {
    id: number;
    label: string;
  };
  image?: string;
};

interface ManageAssetFormProps {
  onSubmit: (fromData: AssetForm) => void;
  asset?: AssetForm;
  loading: boolean;
  scanCode?: boolean;
}

const ManageAssetForm = (props: ManageAssetFormProps) => {
  const { onSubmit, loading, asset, scanCode } = props;
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = useState(scanCode ?? false);

  const formSchema = z.object({
    name: z.string().min(1, t("assets.form.nameRequired")),
    description: z
      .string()
      .max(500, t("assets.form.maxDescriptionLength"))
      .optional(),
    barcode: z
      .string({ invalid_type_error: t("common.invalidInputLabel") })
      .refine((value) => value ?? false, t("assets.form.barCodeRequired"))
      .refine(
        (value) => Number.isInteger(Number(value)),
        t("assets.form.barCodeInvalid")
      )
      .refine((value) => Number(value) > 0, t("assets.form.barCodePositive")),
    price: z.coerce
      .number({ invalid_type_error: t("common.invalidInputLabel") })
      .positive(t("assets.form.pricePositive")),
    employee: z
      .object(
        {
          id: z.coerce.number(),
          label: z.coerce.string(),
        },
        { required_error: t("assets.form.employeeRequired") }
      )
      .required(),
    location: z
      .object(
        {
          id: z.number(),
          label: z.string(),
        },
        { required_error: t("assets.form.locationRequired") }
      )
      .required(),
    image: z.string().optional(),
  });

  var initialValues = {
    name: asset?.name ?? "",
    description: asset?.description ?? "",
    barcode: asset?.barcode ?? "",
    price: asset?.price ?? undefined,
    image: asset?.image ?? undefined,
    location: asset?.location ?? undefined,
    employee: asset?.employee ?? undefined,
  };

  const { control, handleSubmit, setFocus, setValue, getValues } =
    useForm<AssetForm>({
      defaultValues: initialValues,
      resolver: zodResolver(formSchema),
    });

  function handleFormSubmitted(data: AssetForm) {
    onSubmit(data);
  }

  function handleBarcodeScanned(data: string) {
    setValue("barcode", data, { shouldValidate: true });
    setShowScanner(false);
  }

  function handleImageSelected(image: string) {
    setValue("image", image, { shouldValidate: true });
  }

  if (showScanner) {
    return (
      <BarCodeScanner
        onCanceled={() => setShowScanner(false)}
        onBarCodeRead={handleBarcodeScanned}
      />
    );
  }

  function onOpenLocationsSheet() {
    handleOpenSheet("locations-sheet", {
      onLocationSelected: handleLocationSelected,
    });
  }
  function onOpenEmployeesSheet() {
    handleOpenSheet("employees-sheet", {
      onEmployeeSelected: handleEmployeeSelected,
    });
  }
  function handleOpenSheet(sheetName: string, payload: any) {
    SheetManager.show(sheetName, {
      payload: payload,
    });
  }

  function handleLocationSelected(location?: LocationDTO) {
    if (location) {
      setValue(
        "location",
        { id: location.id, label: location.name },
        { shouldValidate: true }
      );
      SheetManager.hide("locations-sheet");
    }
  }

  function handleEmployeeSelected(employee?: EmployeeDTO) {
    if (employee) {
      setValue(
        "employee",
        {
          id: employee.id,
          label: `${employee.firstName} ${employee.lastName}`,
        },
        { shouldValidate: true }
      );
      SheetManager.hide("employees-sheet");
    }
  }

  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-1.5">
        <FormImagePicker
          className=" mb-1.5 pt-2"
          onImageSelected={handleImageSelected}
          image={getValues("image")}
        />

        <FormInput
          title={t("assets.form.nameLabel")}
          name="name"
          control={control}
          placeholder={t("assets.form.namePlaceholder")}
          onSubmitted={() => {
            setFocus("description");
          }}
          returnKeyType="next"
        />
        <FormTextArea
          title={t("assets.form.descriptionLabel")}
          name="description"
          control={control}
          placeholder={t("assets.form.descriptionPlaceholder")}
        />
        <View className="flex-1 flex-row w-full">
          <FormInput
            type="number"
            title={t("assets.form.barCodeLabel")}
            name="barcode"
            control={control}
            placeholder={t("assets.form.barCodePlaceholder")}
            returnKeyType="next"
            onSubmitted={() => {
              setFocus("price");
            }}
            className="flex-1"
          />
          <FormActionButton
            onButtonPressed={() => setShowScanner(true)}
            icon="qr-code-scanner"
            variant="material"
            className="mt-[18px] py-1.5 px-2.5 ml-1"
          />
        </View>

        <FormInput
          type="number"
          title={t("assets.form.priceLabel")}
          name="price"
          control={control}
          placeholder={t("assets.form.pricePlaceholder")}
          onSubmitted={() => {
            onOpenEmployeesSheet();
          }}
          returnKeyType="next"
        />

        <FormSelectInput
          control={control}
          title={t("assets.form.employeeLabel")}
          name="employee"
          placeholder={t("assets.form.employeePlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={onOpenEmployeesSheet}
        />
        <FormSelectInput
          control={control}
          title={t("assets.form.locationLabel")}
          name="location"
          placeholder={t("assets.form.locationPlaceholder")}
          className="flex-1"
          extractValue={(value) => value?.label ?? ""}
          onPressed={onOpenLocationsSheet}
        />
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

export default ManageAssetForm;
