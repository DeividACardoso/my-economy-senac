import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 300,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContent: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  icons: {
    flexDirection: "row",
    gap: 16,
  },
  icon: {
    fontSize: 20,
  },
});
