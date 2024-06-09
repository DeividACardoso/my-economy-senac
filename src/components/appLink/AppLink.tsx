import { GestureResponderEvent, Pressable, Text } from "react-native";
import { styles } from "./AppLinkStyle";

interface AppLinkProps {
  text: string;
  size?: "sm" | "lg" | "xl";
  action?: (event: GestureResponderEvent) => void;
}

export default function AppLink({ text, size = "xl", action }: AppLinkProps) {
  const SIZES = {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  };

  const linkClass = {
    ...styles.text,
    fontSize: SIZES[size],
  };

  return (
    <Pressable onPress={(e) => action(e)}>
      <Text style={linkClass}>{text}</Text>
    </Pressable>
  );
}
