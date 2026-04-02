import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";
import { style } from "./style";

type CategoryProps = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function Category({ isSelected, ...props }: CategoryProps) {
  const color = isSelected ? colors.green[300] : colors.gray[400];
  return (
    <Pressable style={style.container} {...props}>
      <MaterialIcons name={props.icon} size={16} color={colors.gray[400]} />
      <Text style={[style.name, { color }]}>{props.name}</Text>
    </Pressable>
  );
}
