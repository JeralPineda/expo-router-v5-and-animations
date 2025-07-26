import { ActivityType } from "@/data/data";
import { Image, StyleSheet, Text, View } from "react-native";

interface ActivityProps {
  item: ActivityType;
  index: number;
}

export const Activity = ({ item }: ActivityProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textDate}>{item.date}</Text>
      </View>

      <Text style={styles.textPrice}>{item.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 14,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    backgroundColor: "rgba(0,0,0,1)",
    borderRadius: 18,
  },
  image: {
    width: 44,
    height: 44,
    margin: 14,
    resizeMode: "contain",
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textDate: {
    fontSize: 14,
    color: "#666",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
});
