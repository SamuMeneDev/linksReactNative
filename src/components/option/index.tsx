import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type OptionProps = TouchableOpacityProps & {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: "primary" | "secondary";
};

export function Option({ variant = "primary", ...props }: OptionProps) {
  return (
    <TouchableOpacity {...props} style={style.container}>
      <MaterialIcons
        size={20}
        name={props.icon}
        color={variant === "primary" ? colors.green[300] : colors.gray[400]}
      />
      <Text
        style={
          variant === "primary" ? style.primaryTitle : style.secondaryTitle
        }
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
