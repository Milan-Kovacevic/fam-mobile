import { useColorScheme, View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/Button";
import { LocationDTO } from "@/storage/models/locations";
import { LatLng } from "react-native-maps";
import { defaultMapCoordinates } from "./LocationsMap";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormMapSelect from "@/components/form/FormMapSelect";

export type LocationForm = {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

const formSchema = z.object({
  name: z.string().min(1, "City name is required."),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type ManageLocationFormProps = {
  onSubmit: (fromData: LocationForm) => void;
  location?: LocationDTO;
  loading: boolean;
};

const ManageLocationForm = (props: ManageLocationFormProps) => {
  const { onSubmit, loading, location } = props;

  const { control, handleSubmit, getValues, setValue } = useForm<LocationForm>({
    defaultValues: {
      name: location?.name ?? "",
      coordinates: {
        latitude: location?.latitude ?? defaultMapCoordinates.latitude,
        longitude: location?.longitude ?? defaultMapCoordinates.longitude,
      },
    },
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmitted(data: LocationForm) {
    onSubmit({ ...data });
  }

  function handleChangeLocationPin(locationPin: LatLng) {
    setValue("coordinates", locationPin);
  }

  return (
    <View>
      <FormInput
        title={"City name"}
        name="name"
        control={control}
        placeholder="ex. Banja Luka"
        onSubmitted={handleSubmit(handleFormSubmitted)}
      />

      <FormMapSelect
        name="coordinates"
        control={control}
        onPinChange={handleChangeLocationPin}
        cityLabel={
          getValues("name") == "" ? "Enter Location" : getValues("name")
        }
      />

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

export default ManageLocationForm;
