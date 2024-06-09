import { View, Text, Image } from "react-native";
import { styles } from "./AppItemStyle";
import * as Clipboard from "expo-clipboard";
import { useMemo } from "react";

interface AppInputProps {
  text?: string;
  title?: string;
  showPassword?: boolean;
  onShow?: (value: boolean) => void;
  onRemovePassword?: () => void;
}

export default function AppInput({
  text,
  title,
  showPassword,
  onRemovePassword,
  onShow,
}: AppInputProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

  const pass = useMemo(
    () => (showPassword ? text : text.split("").map((c) => "*")),
    [showPassword]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <Text style={styles.textContent}>{pass}</Text>
        <View style={styles.icons}>
          {showPassword ? (
            <Text onPress={() => onShow(false)} style={styles.icon}>
              😀
            </Text>
          ) : (
            <Text onPress={() => onShow(true)} style={styles.icon}>
              😑
            </Text>
          )}
          <Text onPress={copyToClipboard} style={styles.icon}>
            🤚
          </Text>
          <Text onPress={onRemovePassword} style={styles.icon}>
            🗑️
          </Text>
        </View>
      </View>
    </View>
  );
}
