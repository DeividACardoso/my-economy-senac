import { TextInput } from "react-native";
import { styles } from "./AppModalInputTextStyle";

interface AppInputProps {
  text?: string;
  setText?: (e) => void;
  placeholder?: string;
  editable?: boolean;
}

export default function AppInput({
  text,
  setText,
  placeholder,
  editable = true,
}: AppInputProps) {
  return (
    <TextInput
      editable={editable}
      value={text}
      placeholder={placeholder}
      onChangeText={setText}
      style={styles.text}
    />
  );
}
