import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { LinkStorage, linkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./style";
export default function Index() {
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [categoria, setCategoria] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);

  function handleCategoria(valor: string) {
    if (valor === categoria) {
      setCategoria("");
    } else {
      setCategoria(valor);
    }
  }
  function handleModal(item: LinkStorage) {
    setLink(item);
    setShowModal(true);
  }
  async function handleRemove(id: string) {
    try {
      await linkStorage.remove(id);
      await getLinks();
      Alert.alert("Sucesso", "Link excluido com sucesso.", [
        { text: "OK", onPress: () => setShowModal(false) },
      ]);
    } catch (erro) {
      Alert.alert("Não foi possível remover o link");
    }
  }
  async function abrirLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch (erro) {
      Alert.alert("Link", "Não foi possivel abrir link.");
    }
  }
  function validateRemove(id: string) {
    Alert.alert("Excuir", "Deseja realmente excluir?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: async () => handleRemove(id) },
    ]);
  }

  async function getLinks() {
    try {
      const response = await linkStorage.get();

      if (categoria) {
        const filtro = response.filter((item) => item.categoria === categoria);
        setLinks(filtro);
      } else {
        setLinks(response);
      }
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível buscar os links");
    }
  }
  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [categoria]),
  );

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image style={style.logo} source={require("@/assets/logo.png")} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories selected={categoria} onChange={handleCategoria} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.nome}
            url={item.url}
            onDetails={() => handleModal(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={style.links}
        contentContainerStyle={style.linksContent}
      />
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={style.modal}>
          <View style={style.modalContent}>
            <View style={style.modalHeader}>
              <Text style={style.modalCategory}>{link.categoria}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>
            <Text style={style.modalLinkName}>{link.nome}</Text>
            <Text style={style.modalUrl}>{link.url}</Text>
            <View style={style.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={() => validateRemove(link.id)}
              />
              <Option
                name="Abrir"
                onPress={() => abrirLink(link.url)}
                icon="language"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
