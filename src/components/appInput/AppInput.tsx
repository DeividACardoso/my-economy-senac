import { TextInput, DimensionValue } from "react-native";
import { styles } from "./AppInputStyle";

interface AppInputProps {
  text?: string;
  setText?: (e: any) => void;
  placeholder?: string;
  editable?: boolean;
  inputField?: boolean;
  isPassword?: boolean;
}

export default function AppInput({
  text,
  setText,
  placeholder,
  editable = true,
  inputField = false,
  isPassword = false,
}: AppInputProps) {
  const inputFieldClass = {
    width: "100%" as DimensionValue,
    fontSize: 16,
    letterSpacing: 0,
  };

  const customClass = inputField
    ? { ...styles.text, ...inputFieldClass }
    : styles.text;

  return (
    <TextInput
      onChangeText={setText}
      editable={editable}
      value={text}
      placeholder={placeholder}
      secureTextEntry={isPassword}
      style={customClass}
    />
  );
}
