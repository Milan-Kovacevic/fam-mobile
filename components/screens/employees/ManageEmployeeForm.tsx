import { View } from "react-native";
import React from "react";
import { EmployeeDTO } from "@/storage/models/employees";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/shared/form/FormInput";
import { useTranslation } from "react-i18next";

export type EmployeeForm = {
  firstName: string;
  lastName: string;
};

type ManageEmployeeFormProps = {
  onSubmit: (data: EmployeeForm) => void;
  employee?: EmployeeDTO;
  loading: boolean;
};

const ManageEmployeeForm = (props: ManageEmployeeFormProps) => {
  const { onSubmit, loading, employee } = props;
  const { t } = useTranslation();

  const formSchema = z.object({
    firstName: z.string().min(1, t("employees.formFirstNameRequired")),
    lastName: z.string().min(1, t("employees.formLastNameRequired")),
  });

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
        title={t("employees.formFirstNameLabel")}
        name="firstName"
        control={control}
        placeholder={t("employees.formFirstNamePlaceholder")}
        onSubmitted={() => {
          setFocus("lastName");
        }}
        returnKeyType="next"
      />
      <FormInput
        title={t("employees.formLastNameLabel")}
        name="lastName"
        control={control}
        placeholder={t("employees.formLastNamePlaceholder")}
        onSubmitted={handleSubmit(handleFormSubmitted)}
        returnKeyType="done"
        className="mt-2"
      />
      <Button
        variant="primary"
        text={t("common.submitButtonLabel")}
        onPressed={handleSubmit(handleFormSubmitted)}
        className="mt-5 mx-1"
        loading={loading}
      />
    </View>
  );
};

export default ManageEmployeeForm;
