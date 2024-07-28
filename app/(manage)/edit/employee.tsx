import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useColorScheme, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";
import { delay } from "@/utils/util";
import { showToast } from "@/utils/toast";
import { EmployeeDTO } from "@/storage/models/employees";
import {
  getEmployeeById,
  updateEmployee,
} from "@/storage/repositories/employees-repository";
import ManageEmployeeForm from "@/components/screens/employees/ManageEmployeeForm";
import ManageEmployeeHeading from "@/components/screens/employees/ManageEmployeeHeading";
import { useTranslation } from "react-i18next";

const EditEmployeeScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams();
  const [employeeId, setEmployeeId] = useState<number>();
  const [employee, setEmployee] = useState<EmployeeDTO | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    if (id == undefined) {
      router.push("/employees");
      return;
    }
    var routeId = parseInt(id[0]);
    if (isNaN(routeId)) {
      router.push("/employees");
      return;
    }
    setEmployeeId(routeId);
    setLoading(true);
    getEmployeeById(db, routeId)
      .then((result) => {
        if (result == null) {
          showToast(t("employees.notFoundError"), scheme);
          router.push("/employees");
          return;
        }
        setEmployee(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleEmployeeSubmitted(employeeForm: {
    firstName: string;
    lastName: string;
  }) {
    setLoading(true);
    await delay(750);
    updateEmployee(db, {
      id: employeeId!,
      firstName: employeeForm.firstName,
      lastName: employeeForm.lastName,
    })
      .then((isSuccess) => {
        if (isSuccess) router.push("/employees");
        else {
          showToast(t("employees.updateError"), scheme);
        }
      })
      .catch((err) => {
        showToast(t("employees.updateError"), scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen className="h-full w-full px-4 py-4 mt-10" variant="scroll">
      <View className="px-2">
        <ManageEmployeeHeading text={t("employees.editDescription")} />
        {employee && (
          <ManageEmployeeForm
            loading={loading}
            employee={employee}
            onSubmit={handleEmployeeSubmitted}
          />
        )}
      </View>
    </Screen>
  );
};

export default EditEmployeeScreen;
