import { View } from "react-native";
import React from "react";
import { EmployeeDTO } from "@/storage/models/employees";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/shared/form/FormInput";

export type EmployeeForm = {
  firstName: string;
  lastName: string;
};

type ManageEmployeeFormProps = {
  onSubmit: (data: EmployeeForm) => void;
  employee?: EmployeeDTO;
  loading: boolean;
};

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
});

const ManageEmployeeForm = (props: ManageEmployeeFormProps) => {
  const { onSubmit, loading, employee } = props;

  const { control, handleSubmit, setFocus } = useForm<EmployeeForm>({
    defaultValues: {
      firstName: employee?.firstName ?? "",
      lastName: employee?.lastName ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmitted(data: EmployeeForm) {
    onSubmit({ ...data });
  }

  return (
    <View>
      <FormInput
        title={"First Name"}
        name="firstName"
        control={control}
        placeholder="ex. Marko"
        onSubmitted={() => {
          setFocus("lastName");
        }}
        returnKeyType="next"
      />
      <FormInput
        title={"Last Name"}
        name="lastName"
        control={control}
        placeholder="ex. Markovic"
        onSubmitted={handleSubmit(handleFormSubmitted)}
        returnKeyType="done"
        className="mt-3"
      />
      <Button
        variant="primary"
        text="Submit"
        onPressed={handleSubmit(handleFormSubmitted)}
        className="mt-4 mx-1"
        loading={loading}
      />
    </View>
  );
};

export default ManageEmployeeForm;
