import { palette } from "@/theme/colors";
import { ColorSchemeName } from "react-native";
import Toast from "react-native-root-toast";

export function showToast(text: string, colorScheme: ColorSchemeName) {
  Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    opacity: 0.95,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: $containerStyle,
    textStyle: $textStyle,
    backgroundColor:
      colorScheme == "dark" ? palette.primary50 : palette.primary900,
    textColor: colorScheme == "dark" ? palette.primary950 : palette.primary50,
  });
}

const $containerStyle = {
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingVertical: 12,
  paddingBottom: 8,
};

const $textStyle = {
  fontFamily: "poppinsRegular",
  fontSize: 14,
  lineHeight: 16,
};
