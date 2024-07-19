import { TouchableOpacityProps } from "react-native";
import { Button } from "../../ui/Button";
import { Icon, IconVariant } from "../../ui/Icon";

interface FormActionButtonProps extends TouchableOpacityProps {
  onButtonPressed: () => void;
  icon: string;
  variant: IconVariant;
}

const FormActionButton = ({
  onButtonPressed,
  icon,
  variant,
  ...rest
}: FormActionButtonProps) => {
  return (
    <Button
      variant="ghost"
      LeftAccessory={() => (
        <Icon
          icon={icon}
          variant={variant}
          className="text-2xl text-gray-600 dark:text-gray-300"
        />
      )}
      className="p-2 py-1 rounded-2xl ml-0.5 self-start mt-6 bg-primary-100/60 dark:bg-primary-900/80 border-2 border-primary-50 dark:border-primary-950"
      onPressed={onButtonPressed}
      {...rest}
    />
  );
};

export default FormActionButton;
