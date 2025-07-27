import { AvailabilityAnimation } from "@/components/availability-animation/availability-animation";
import { generateHomes, HomeType } from "@/mock/home";
import { useRef, useState } from "react";
import { Button, View } from "react-native";

export default function Availability() {
  const [data, setData] = useState<HomeType[]>(generateHomes());
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#fff",
        // alignItems: "center",
      }}
    >
      <AvailabilityAnimation data={data} isLoading={isLoading} />

      <Button
        title="Generate new data"
        onPress={() => {
          timer.current && clearTimeout(timer.current);
          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
            setData(generateHomes());
          }, Math.random() * 1000 + 1000);
        }}
      />
    </View>
  );
}
