import { GestureResponderEvent, Pressable, Text } from "react-native";
import { styles } from "./AppButtonStyle";

interface AppButtonProps {
  text: string;
  disabled?: boolean;
  action?: (event: GestureResponderEvent) => void;
}

export default function AppButton({
  text,
  disabled = false,
  action,
}: AppButtonProps) {
  const buttonClass = !disabled ? styles.button : styles.disabledButton;
  const textClass = !disabled ? styles.text : styles.disabledtext;

  return (
    <Pressable
      disabled={disabled}
      style={buttonClass}
      onPress={(e) => action(e)}
    >
      <Text style={textClass}>{text}</Text>
    </Pressable>
  );
}
