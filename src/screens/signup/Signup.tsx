import { View, Text } from "react-native";
import { styles } from "./SignupStyle";
import AppTitle from "../../components/appTitle/AppTitle";
import AppInput from "../../components/appInput/AppInput";
import AppButton from "../../components/appButton/AppButton";
import AppLink from "../../components/appLink/AppLink";
import { useMemo, useState } from "react";
import { useAuth } from "../../context/authContext";

export default function Login({ navigation }) {
  const { onRegister } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const goToSignin = () => {
    navigation.navigate("Signin");
  };

  const isValidForm = useMemo(() => {
    return (
      password === confirmPassword &&
      !!name &&
      !!email &&
      !!password &&
      confirmPassword
    );
  }, [name, email, password, confirmPassword]);

  const register = async () => {
    try {
      await onRegister(name, email, password, confirmPassword);

      navigation.navigate("Signin");
    } catch (error) {
      setSignupError(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <AppTitle text="Sign Up" />
      </View>

      <View style={styles.inputs}>
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <AppInput setText={setName} text={name} inputField />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <AppInput setText={setEmail} text={email} inputField />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <AppInput
            isPassword
            setText={setPassword}
            text={password}
            inputField
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <AppInput
            setText={setConfirmPassword}
            isPassword
            text={confirmPassword}
            inputField
          />
          {!!signupError && (
            <Text style={{ color: "red", fontSize: 10 }}>{signupError}</Text>
          )}
        </View>
      </View>

      <View style={styles.cta}>
        <AppButton action={register} disabled={!isValidForm} text="REGISTRAR" />
        <AppLink action={goToSignin} size="sm" text="Voltar" />
      </View>
    </View>
  );
}
