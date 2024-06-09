import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { styles } from "./AppModalStyle";
import AppModalInputText from "./inputText/AppModalInputText";
import AppModalButton from "./button/AppModalButton";
import { generatePassword } from "../../services/passwordService";
import { createItem } from "../../services/item/itemService";
import { useMemo, useState } from "react";

interface AppModal {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onConfirm: () => void;
  password: string;
}

export default function AppModal({
  modalVisible,
  password,
  setModalVisible,
  onConfirm,
}: AppModal) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const isValidForm = useMemo(() => {
    return !!name && !!password;
  }, [name, password]);

  const savePassword = async () => {
    const newPassword = generatePassword();

    if (!isValidForm) return;

    try {
      await createItem({ name, password: newPassword });
      onConfirm();
    } catch (e) {
      setNameError(e.response.data.message);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      style={styles.modal}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cadastro de senha</Text>

          <View style={styles.fieldContainer}>
            <Text>Nome do aplciativo</Text>
            <AppModalInputText setText={setName} text={name} />
            {!!nameError && <Text style={styles.error}>{nameError}</Text>}
          </View>

          <View style={styles.fieldContainer}>
            <Text>Senha gerada</Text>
            <AppModalInputText editable={false} text={password} />
          </View>

          <AppModalButton
            disabled={!isValidForm}
            action={savePassword}
            text="CRIAR"
          />
          <AppModalButton
            action={() => setModalVisible(false)}
            text="CANCELAR"
          />
        </View>
      </View>
    </Modal>
  );
}
