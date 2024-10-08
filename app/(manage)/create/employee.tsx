import React, { useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useColorScheme, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
import { delay } from "@/utils/util";
import { showToast } from "@/utils/toast";
import ManageEmployeeHeading from "@/components/screens/employees/ManageEmployeeHeading";
import ManageEmployeeForm from "@/components/screens/employees/ManageEmployeeForm";
import { createEmployee } from "@/storage/repositories/employees-repository";
import { useTranslation } from "react-i18next";

const CreateLocationScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  async function handleEmployeeSubmitted(formData: {
    firstName: string;
    lastName: string;
  }) {
    setLoading(true);
    await delay(750);
    createEmployee(db, { ...formData })
      .then((_) => {
        router.push("/employees");
      })
      .catch((err) => {
        showToast(t("employees.createError"), scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen className="h-full w-full px-4 py-4 mt-10" variant="scroll">
      <View className="px-2">
        <ManageEmployeeHeading text={t("employees.createDescription")} />

        <ManageEmployeeForm
          loading={loading}
          onSubmit={handleEmployeeSubmitted}
        />
      </View>
    </Screen>
  );
};

export default CreateLocationScreen;
