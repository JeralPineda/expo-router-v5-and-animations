import { BackButton } from "@/components/back-button";
import { CircularSlider } from "@/components/circular-slider/circular-slider";
import { View } from "react-native";

export default function CircularCarousel() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <CircularSlider />
      </View>

      <BackButton />
    </>
  );
}
