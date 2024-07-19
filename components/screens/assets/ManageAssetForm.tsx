import { View } from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/shared/form/FormInput";
import FormTextArea from "@/components/shared/form/FormTextArea";
import BarCodeScanner from "./BarCodeScanner";
import FormImagePicker from "@/components/shared/form/FormImagePicker";
import FormActionButton from "@/components/shared/form/FormActionButton";
import FormReadonlyInput from "@/components/shared/form/FormReadonlyInput";
import { SheetManager } from "react-native-actions-sheet";
import { LocationDTO } from "@/storage/models/locations";
import { EmployeeDTO } from "@/storage/models/employees";

export type AssetForm = {
  name: string;
  description?: string;
  barcode: string;
  price: number;
  // dateCreated: Date;
  location: {
    id: number;
    label: string;
  };
  employee: {
    id: number;
    label: string;
  };
  image?: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z
    .string()
    .max(500, "Maximum description length is 500 characters.")
    .optional(),
  barcode: z
    .string({ invalid_type_error: "Invalid input" })
    .refine((value) => value ?? false, "Barcode is required.")
    .refine((value) => Number.isInteger(Number(value)), "Invalid number.")
    .refine((value) => Number(value) > 0, "Barcode must be positive integer."),
  price: z.coerce
    .number({ invalid_type_error: "Invalid input" })
    .positive("Price must be positive."),
  location: z
    .object(
      {
        id: z.number(),
        label: z.string(),
      },
      { required_error: "Location is required." }
    )
    .required(),
  employee: z
    .object(
      {
        id: z.coerce.number(),
        label: z.coerce.string(),
      },
      { required_error: "Employee is required." }
    )
    .required(),
  image: z.string().optional(),
});

interface ManageAssetFormProps {
  onSubmit: (fromData: AssetForm) => void;
  asset?: AssetForm;
  loading: boolean;
}

const ManageAssetForm = (props: ManageAssetFormProps) => {
  const { onSubmit, loading, asset } = props;
  const [showScanner, setShowScanner] = useState(false);

  var initialValues = {
    name: asset?.name ?? "",
    description: asset?.description ?? "",
    barcode: asset?.barcode ?? "",
    price: asset?.price ?? undefined,
    image: asset?.image ?? undefined,
    location: asset?.location ?? undefined,
    employee: asset?.employee ?? undefined,
  };

  const { control, handleSubmit, setFocus, setValue } = useForm<AssetForm>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmitted(data: AssetForm) {
    console.log(data);
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
      <View className="flex-1 gap-y-1">
        <FormImagePicker
          className=" mb-1.5 pt-2"
          onImageSelected={handleImageSelected}
          image={initialValues.image}
        />

        <FormInput
          title={"Name"}
          name="name"
          control={control}
          placeholder="Asset name..."
          onSubmitted={() => {
            setFocus("description");
          }}
          returnKeyType="next"
        />
        <FormTextArea
          title={"Description"}
          name="description"
          control={control}
          placeholder="This is optional..."
        />
        <View className="flex-1 flex-row w-full">
          <FormInput
            type="number"
            title={"Bar Code"}
            name="barcode"
            control={control}
            placeholder="ex. 123"
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
          />
        </View>

        <FormInput
          type="number"
          title={"Price"}
          name="price"
          control={control}
          placeholder="ex. 19.49"
          onSubmitted={() => {
            onOpenLocationsSheet();
          }}
          returnKeyType="next"
        />
        <View className="flex-1 flex-row w-full">
          <FormReadonlyInput
            control={control}
            title="Location"
            name="location"
            placeholder="Select location..."
            className="flex-1"
            extractValue={(value) => value?.label ?? ""}
          />
          <FormActionButton
            onButtonPressed={onOpenLocationsSheet}
            icon="list"
            variant="entypo"
          />
        </View>

        <View className="flex-1 flex-row w-full">
          <FormReadonlyInput
            control={control}
            title="Employee in charge"
            name="employee"
            placeholder="Select employee..."
            className="flex-1"
            extractValue={(value) => value?.label ?? ""}
          />
          <FormActionButton
            onButtonPressed={onOpenEmployeesSheet}
            icon="list"
            variant="entypo"
          />
        </View>
      </View>

      <Button
        variant="primary"
        text="Submit"
        onPressed={handleSubmit(handleFormSubmitted)}
        className="mt-6"
        loading={loading}
      />
    </View>
  );
};

export default ManageAssetForm;
