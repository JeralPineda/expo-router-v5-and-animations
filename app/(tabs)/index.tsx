import OptionList from "@/components/option-list";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.text}>Animaciones</Text>

      <View style={styles.container}>
        <OptionList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
