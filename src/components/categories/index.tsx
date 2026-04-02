import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "../category";
import { style } from "./style";

type CategoriesProps = {
  selected: string;
  onChange: (category: string) => void;
};

export function Categories({ selected, onChange }: CategoriesProps) {
  return (
    <FlatList
      style={style.container}
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.content}
      renderItem={({ item }) => (
        <Category
          isSelected={item.name === selected}
          name={item.name}
          icon={item.icon}
          onPress={() => onChange(item.name)}
        />
      )}
    />
  );
}
