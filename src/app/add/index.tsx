import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { linkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

export default function Add() {
  const [nome, setNome] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione uma categoria");
      }

      if (!nome.trim()) {
        return Alert.alert("Nome", "Insira um nome para o link");
      }
      if (!url.trim()) {
        return Alert.alert("URL", "Insira a URL");
      }

      await linkStorage.save({
        id: new Date().getTime().toString(),
        categoria: category,
        url,
        nome,
      });
      Alert.alert("Sucesso", "Link adicionado com sucesso", [
        { text: "OK", onPress: () => router.back() },
      ]);
      setNome("");
      setCategory("");
      setUrl("");
    } catch (erro) {}
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={style.title}>Novo</Text>
      </View>
      <Text style={style.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={style.form}>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          autoCorrect={false}
        />
        <Input
          placeholder="URL"
          value={url}
          onChangeText={setUrl}
          autoCorrect={false}
        />

        <Button
          title="Adicionar"
          activeOpacity={0.7}
          onPress={() => handleAdd()}
        />
      </View>
    </View>
  );
}
