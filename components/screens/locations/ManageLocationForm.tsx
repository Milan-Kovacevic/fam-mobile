import { View } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { LocationDTO } from "@/storage/models/locations";

type ManageLocationFormProps = {
  onSubmit: ({ name }: { name: string }) => void;
  location?: LocationDTO;
  loading: boolean;
};

const ManageLocationForm = (props: ManageLocationFormProps) => {
  const { onSubmit, loading, location } = props;

  const [locationForm, setLocationForm] = useState({
    name: location?.name ?? "",
  });
  const [errors, setErrors] = useState<{ name?: string }>({
    name: undefined,
  });

  function handleChangeLocationName(text: string) {
    setLocationForm({ ...locationForm, name: text });
  }

  function handleLocationSubmitted() {
    setErrors({ name: undefined });
    if (locationForm.name.trim() == "") {
      setErrors({ ...errors, name: "Name cannot be empty" });
      return;
    }

    onSubmit({ name: locationForm.name });
  }

  return (
    <View>
      <FormField
        title={"City name"}
        text={locationForm.name}
        handleChangeText={handleChangeLocationName}
        handleSubmitted={handleLocationSubmitted}
        placeholder="ex. Banja Luka"
        returnKeyType="done"
        error={errors.name}
      />
      <Button
        variant="primary"
        text="Submit"
        onPressed={handleLocationSubmitted}
        className="mt-4"
        loading={loading}
      />
    </View>
  );
};

export default ManageLocationForm;
