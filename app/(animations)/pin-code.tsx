import { BackButton } from "@/components/back-button";
import { DialPadContainer } from "@/components/pin-code/dial-pad";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PinCode() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top + 35,
          paddingBottom: insets.bottom,
        }}
      >
        <DialPadContainer />
      </View>

      <BackButton />
    </>
  );
}
