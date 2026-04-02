import { colors } from "@/styles/colors";
import { TextInput, TextInputProps } from "react-native";
import { style } from "./style";

type InputProps = TextInputProps & {};

export function Input({ ...props }: InputProps) {
  return (
    <TextInput
      style={style.container}
      placeholderTextColor={colors.gray[400]}
      {...props}
    />
  );
}
