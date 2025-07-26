import { Ticker } from "@/components/animated-counter/ticker";
import { useState } from "react";
import { Button, View } from "react-native";

export default function AnimatedCounter() {
  const [value, setValue] = useState(123451);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ticker value={value} fontSize={60} />
      <Button
        title="random value"
        onPress={() => setValue(Math.floor(Math.random() * 89900) / 100)}
      />
    </View>
  );
}
