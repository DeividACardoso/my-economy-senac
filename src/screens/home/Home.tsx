import { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./HomeStyle";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppTitle from "../../components/appTitle/AppTitle";
import AppImage from "../../components/appImage/AppImage";
import AppInput from "../../components/appInput/AppInput";
import AppButton from "../../components/appButton/AppButton";
import AppLink from "../../components/appLink/AppLink";
import AppModal from "../../components/appModal/AppModal";
import logo from "../../../assets/pass-gen.png";
import { generatePassword } from "../../services/passwordService";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);

  const goToHistory = () => {
    navigation.navigate("History", { passwords });
  };

  const setRandomPassword = async () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
  };

  const getData = async () => {
    try {
      const response = await AsyncStorage.getItem("passwords");
      return response ? JSON.parse(response) : [];
    } catch (e) {
      console.log(e);
    }
  };

  const mountHome = async () => {
    const result = await getData();

    setPasswords(result);
  };

  const onCreatePassword = () => {
    setModalVisible(false);
    goToHistory();
  };

  useEffect(() => {
    mountHome();
  }, []);

  return (
    <View style={styles.container}>
      {modalVisible && (
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onConfirm={onCreatePassword}
          password={password}
        />
      )}

      <View>
        <AppTitle text="Gerador de senha" />
      </View>

      <View>
        <AppImage image={logo} />
      </View>

      <View style={styles.actions}>
        <AppInput
          text={password}
          editable={false}
          placeholder="GERE SUA SENHA"
        />
        <AppButton action={setRandomPassword} text="GERAR" />
        <AppButton
          disabled={!password}
          action={() => setModalVisible(!modalVisible)}
          text="SALVAR"
        />
        <AppButton action={copyToClipboard} text="COPIAR" />
      </View>

      <View style={styles.link}>
        <AppLink action={goToHistory} text="Ver Senhas" />
      </View>
    </View>
  );
}
