import { View } from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FormSelectInput from "./FormSelectInput";

type FormDatePickerProps = {
  title: string;
  name: string;
  placeholder?: string;
  control: any;
  mode?: string;
  date?: Date;
};

const FormDatePicker = (props: FormDatePickerProps) => {
  const { title, name, placeholder, mode, date, control } = props;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [show, setShow] = useState(false);
  const $mode = mode ?? "date";

  function handleOpenDatePicker() {
    setShow(true);
  }

  function handleDatePicked(event: DateTimePickerEvent, selectedDate?: Date) {
    setSelectedDate(selectedDate);
    setShow(false);
  }

  return (
    <View>
      {show && (
        <DateTimePicker
          accentColor="red"
          textColor="red"
          themeVariant="dark"
          value={new Date()}
          onChange={handleDatePicked}
        />
      )}

      <FormSelectInput
        control={control}
        title={title}
        name={name}
        placeholder={placeholder}
        className="flex-1"
        extractValue={(value) => value?.label ?? ""}
        onPressed={handleOpenDatePicker}
      />
    </View>
  );
};

export default FormDatePicker;
