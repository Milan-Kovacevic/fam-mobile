import { TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { EmployeeDTO } from "@/storage/models/employees";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type ManageEmployeeFormProps = {
  onSubmit: ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => void;
  employee?: EmployeeDTO;
  loading: boolean;
};

const ManageEmployeeForm = (props: ManageEmployeeFormProps) => {
  const { onSubmit, loading, employee } = props;
  const lastNameInputRef = useRef<TextInput>(null);

  const [employeeForm, setEmployeeForm] = useState({
    firstName: employee?.firstName ?? "",
    lastName: employee?.lastName ?? "",
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({
    firstName: undefined,
    lastName: undefined,
  });

  function handleChangeFirstName(text: string) {
    setEmployeeForm({ ...employeeForm, firstName: text });
  }
  function handleChangeLastName(text: string) {
    setEmployeeForm({ ...employeeForm, lastName: text });
  }

  function handleFormSubmitted() {
    setErrors({ ...errors, firstName: undefined, lastName: undefined });

    if (employeeForm.firstName.trim() == "") {
      setErrors((prev) => ({
        ...prev,
        firstName: "First Name cannot be empty",
      }));
      return;
    }
    if (employeeForm.lastName.trim() == "") {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last Name cannot be empty",
      }));
      return;
    }

    onSubmit({
      firstName: employeeForm.firstName,
      lastName: employeeForm.lastName,
    });
  }

  return (
    <View>
      <FormField
        title={"First Name"}
        text={employeeForm.firstName}
        handleChangeText={handleChangeFirstName}
        handleSubmitted={() => {
          lastNameInputRef?.current?.focus();
        }}
        placeholder="ex. Marko"
        returnKeyType="next"
        error={errors.firstName}
      />
      <FormField
        ref={lastNameInputRef}
        title={"Last Name"}
        text={employeeForm.lastName}
        handleChangeText={handleChangeLastName}
        handleSubmitted={handleFormSubmitted}
        placeholder="ex. Markovic"
        returnKeyType="done"
        className="mt-3"
        error={errors.lastName}
      />

      <Button
        variant="primary"
        text="Submit"
        onPressed={handleFormSubmitted}
        className="mt-4"
        loading={loading}
      />
    </View>
  );
};

export default ManageEmployeeForm;
