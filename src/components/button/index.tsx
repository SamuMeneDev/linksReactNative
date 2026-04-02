import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={style.container} {...props}>
      <Text style={style.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}
