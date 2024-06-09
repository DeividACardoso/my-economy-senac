import { View, Text } from "react-native";
import { styles } from "./LoginStyle";
import AppTitle from "../../components/appTitle/AppTitle";
import AppInput from "../../components/appInput/AppInput";
import AppButton from "../../components/appButton/AppButton";
import AppLink from "../../components/appLink/AppLink";
import { useMemo, useState } from "react";
import { useAuth } from "../../context/authContext";

export default function Login({ navigation }) {
  const { onLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  const signin = async () => {
    try {
      await onLogin(email, password);
      navigation.navigate("Home");
    } catch (error) {
      setSigninError(error.response.data.message);
    }
  };

  const isValidForm = useMemo(() => {
    return !!email && !!password;
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View>
        <AppTitle text="Sign In" />
      </View>

      <View style={styles.inputs}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <AppInput text={email} setText={setEmail} inputField />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <AppInput
            text={password}
            setText={setPassword}
            isPassword
            inputField
          />
          {!!signinError && (
            <Text style={{ color: "red", fontSize: 10 }}>{signinError}</Text>
          )}
        </View>
      </View>

      <View style={styles.cta}>
        <AppButton disabled={!isValidForm} action={signin} text="ENTRAR" />
        <AppLink
          action={goToSignup}
          size="sm"
          text="Não possui conta ainda? Criae agora."
        />
      </View>
    </View>
  );
}
