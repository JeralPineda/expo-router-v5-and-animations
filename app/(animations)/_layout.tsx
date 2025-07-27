import { IconIon } from "@/components/ui/ion-icon";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function AnimatedLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Animations",

        headerLeft: ({ canGoBack }) => {
          return (
            <Pressable onPress={() => router.back()}>
              <IconIon name="chevron-back" size={24} />
            </Pressable>
          );
        },
      }}
    >
      <Stack.Screen name="card-swipe" options={{ title: "Card Swipe" }} />
      <Stack.Screen
        name="animated-counter"
        options={{ title: "Animated Counter" }}
      />
      <Stack.Screen name="animated-tabs" options={{ title: "Animated Tabs" }} />
      <Stack.Screen
        name="schedule-animation"
        options={{ title: "Schedule Animation" }}
      />
      <Stack.Screen
        name="pin-code"
        options={{ title: "Pin Code", headerShown: false }}
      />
    </Stack>
  );
}
