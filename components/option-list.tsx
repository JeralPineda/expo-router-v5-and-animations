import OptionItem from "@/components/option-item";
import { navigationData } from "@/mock/navigation";
import { FlatList, StyleSheet } from "react-native";

export default function OptionList() {
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      data={navigationData}
      renderItem={({ item, index }) => {
        const isLastItem = index === navigationData.length - 1;
        return <OptionItem item={item} isLastItem={isLastItem} />;
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
