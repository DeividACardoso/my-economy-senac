import { Text, View, Button } from "react-native";
import AppTitle from "../../components/appTitle/AppTitle";
import AppItem from "../../components/appItem/AppItem";
import { styles } from "./HistoryStyle";
import { useEffect, useState } from "react";
import { getItems, removeItem } from "../../services/item/itemService";

export default function History({ route, navigation }) {
  const [passwordList, setPasswordList] = useState([]);

  const getData = async () => {
    try {
      const response = await getItems();
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const onRemovePassword = async (id: string) => {
    const newPasswords = passwordList.filter((el) => el.id !== id);

    try {
      await removeItem(id);

      setPasswordList(newPasswords || []);
    } catch (e) {
      console.log(e);
    }

    setPasswordList(newPasswords);
  };

  const showPassword = (id: string, value: boolean) => {
    const item = passwordList.find((el) => el.id === id);
    const newPasswords = passwordList.map((el) => {
      if (el.id === item.id) return { ...el, show: value };
      return el;
    });

    setPasswordList(newPasswords);
  };

  const mountHistory = async () => {
    const passwords = await getData();

    setPasswordList(passwords || []);
  };

  useEffect(() => {
    mountHistory();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <AppTitle text="HISTÓRICO DE SENHAS" />
      </View>

      <View style={styles.itemContainer}>
        {!passwordList.length && <Text>Nenhuma senha foi gerada</Text>}
        {passwordList.map((item, idx) => (
          <AppItem
            onShow={(value) => showPassword(item.id, value)}
            onRemovePassword={() => onRemovePassword(item.id)}
            key={idx}
            text={item.password}
            title={item.name}
            showPassword={item.show}
          />
        ))}
      </View>

      <View>
        <Button onPress={() => navigation.goBack()} title="VOLTAR" />
      </View>
    </View>
  );
}
