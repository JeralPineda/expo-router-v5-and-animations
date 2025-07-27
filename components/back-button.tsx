import { IconIon } from "@/components/ui/ion-icon";
import { router } from "expo-router";
import { Pressable } from "react-native";

export const BackButton = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        height: 30,
        width: 30,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 50,
        left: 16,
      }}
    >
      <IconIon name="chevron-back" size={20} color="#fff" />
    </Pressable>
  );
};
