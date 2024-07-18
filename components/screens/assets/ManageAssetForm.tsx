import { View, Text, useColorScheme } from "react-native";
import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export type AssetForm = {
  name: string;
  description?: string;
  barcode: number;
  price: number;
  dateCreated: Date;
  employeeId: number;
  locationId: number;
  image?: string;
};

export type AssetFormErrors = {
  name?: string;
  description?: string;
  barcode?: string;
  price?: string;
  dateCreated?: string;
  employeeId?: string;
  locationId?: string;
  image?: string;
};

interface ManageAssetFormProps {
  onSubmit: (fromData: AssetForm) => void;
  asset?: AssetForm;
  loading: boolean;
}

const ManageAssetForm = (props: ManageAssetFormProps) => {
  const { onSubmit, loading, asset } = props;
  const scheme = useColorScheme();

  const [formData, setFormData] = useState<AssetForm>({
    name: asset?.name ?? "",
    description: asset?.description ?? undefined,
    barcode: asset?.barcode ?? 0,
    price: asset?.price ?? 0,
    dateCreated: asset?.dateCreated ?? new Date(),
    employeeId: asset?.employeeId ?? -1,
    locationId: asset?.locationId ?? -1,
  });
  const [errors, setErrors] = useState<AssetFormErrors>({});

  function handleChangeFormData(text: string, label: keyof AssetForm) {
    setFormData({ ...formData, [label]: text });
  }

  function validateForm() {}

  function handleFormSubmitted() {
    const errors = validateForm();
  }

  return (
    <View>
      <FormField
        title={"Asset name"}
        text={formData.name}
        handleChangeText={(text) => handleChangeFormData(text, "name")}
        placeholder="ex. Banja Luka"
        returnKeyType="done"
        error={errors.name}
      />

      <Button
        variant="primary"
        text="Submit"
        onPressed={handleFormSubmitted}
        className="mt-6"
        loading={loading}
      />
    </View>
  );
};

export default ManageAssetForm;
