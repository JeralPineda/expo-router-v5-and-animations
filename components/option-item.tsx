import { IconIon } from "@/components/ui/ion-icon";
import { NavigationItem } from "@/types";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OptionItem({
  item,
  isLastItem,
}: {
  item: NavigationItem;
  isLastItem?: boolean;
}) {
  const route = useRouter();

  const handlePress = () => {
    route.push(item.href);
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemcontainer,
        {
          borderBottomWidth: isLastItem ? 0 : 0.3,
          borderBottomColor: "#ccc",
        },
      ]}
      onPress={handlePress}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <IconIon name={item.icon} size={22} />
        <Text>{item.name}</Text>
      </View>

      <View>
        <IconIon
          name="chevron-forward"
          size={20}
          color="gray"
          style={{ textAlign: "right" }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemcontainer: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
});
