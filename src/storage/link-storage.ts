import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "links-storage";

export type LinkStorage = {
  id: string;
  nome: string;
  url: string;
  categoria: string;
};

async function get(): Promise<LinkStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(KEY);
    const response = storage ? JSON.parse(storage) : [];
    return response;
  } catch (erro) {
    throw erro;
  }
}

async function save(newLink: LinkStorage) {
  try {
    const storage = await get();
    const update = JSON.stringify([...storage, newLink]);
    await AsyncStorage.setItem(KEY, update);
  } catch (erro) {
    throw erro;
  }
}

async function remove(id: string) {
  try {
    const storage = await get();
    const update = JSON.stringify(storage.filter((item) => item.id != id));

    await AsyncStorage.setItem(KEY, update);
  } catch (erro) {
    throw erro;
  }
}

export const linkStorage = { get, save, remove };
