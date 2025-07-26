import { Card } from "@/components/card";
import { data } from "@/data/data";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const MAX = 3;

export default function Home() {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.cardsContainer}>
        {newData.map((item, index) => {
          if (index > currentIndex + MAX || index < currentIndex) return null;

          return (
            <Card
              key={`card-${index}`}
              item={item}
              index={index}
              dataLength={newData.length}
              maxVisibleItem={MAX}
              currentIndex={currentIndex}
              animatedValue={animatedValue}
              setCurrentIndex={setCurrentIndex}
              setNewData={setNewData}
              newData={newData}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
