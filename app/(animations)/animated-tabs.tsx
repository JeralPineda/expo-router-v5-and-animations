import { Tabs } from "@/components/animated-tabs/tabs";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = ["#ff005c", "#00ff5c", "#005cff", "#ff5c00", "#5c00ff"];

export default function AnimatedTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Tabs
        data={[
          { icon: "LifeBuoy", label: "Buoy" },
          { icon: "Fish", label: "Fesh fish" },
          { icon: "Sailboat", label: "Sail" },
          { icon: "Ship", label: "Ship it" },
          { icon: "ShipWheel", label: "Manage it" },
        ]}
        onChange={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
      />

      {/* Evitar la animacion al entrar la primera vez */}
      <LayoutAnimationConfig skipExiting>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
          style={{
            backgroundColor: tabs[selectedIndex],
            flex: 1,
            borderRadius: 8,
          }}
        />
      </LayoutAnimationConfig>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    margin: 12,
    gap: 12,
  },
});
