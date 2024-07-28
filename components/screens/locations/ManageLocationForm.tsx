import { useColorScheme, View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/Button";
import { LocationDTO } from "@/storage/models/locations";
import { LatLng } from "react-native-maps";
import { defaultMapCoordinates } from "./LocationsMap";
import { useForm } from "react-hook-form";
import FormInput from "@/components/shared/form/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormMapSelect from "@/components/shared/form/FormMapSelect";
import { useTranslation } from "react-i18next";

export type LocationForm = {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

type ManageLocationFormProps = {
  onSubmit: (fromData: LocationForm) => void;
  location?: LocationDTO;
  loading: boolean;
};

const ManageLocationForm = (props: ManageLocationFormProps) => {
  const { onSubmit, loading, location } = props;
  const { t } = useTranslation();

  const formSchema = z.object({
    name: z.string().min(1, t("locations.formCityRequired")),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  });

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
        title={t("locations.formCityLabel")}
        name="name"
        control={control}
        placeholder={t("locations.formCityPlaceholder")}
        onSubmitted={handleSubmit(handleFormSubmitted)}
      />

      <FormMapSelect
        name="coordinates"
        control={control}
        location={location}
        onPinChange={handleChangeLocationPin}
        cityLabel={
          getValues("name") == ""
            ? t("locations.formMapLabel")
            : getValues("name")
        }
      />

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

export default ManageLocationForm;
