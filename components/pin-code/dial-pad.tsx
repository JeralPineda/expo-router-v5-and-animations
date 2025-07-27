import { IconIon } from "@/components/ui/ion-icon";
import { MotiView } from "moti";
import { useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;

const _spacing = 20;
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;

export const DialPad = ({
  onPress,
}: {
  onPress: (item: (typeof dialPad)[number]) => void;
}) => {
  return (
    <FlatList
      numColumns={3}
      style={{
        flexGrow: 0,
      }}
      scrollEnabled={false}
      columnWrapperStyle={{
        gap: _spacing,
      }}
      contentContainerStyle={{
        gap: _spacing,
      }}
      data={dialPad}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ""}
            onPress={() => onPress(item)}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: typeof item !== "number" ? 0 : 1,
                borderColor: "black",
                borderRadius: 50,
              }}
            >
              {item === "del" ? (
                <IconIon
                  name="backspace-outline"
                  size={dialPadTextSize}
                  color="black"
                />
              ) : (
                <Text style={{ fontSize: dialPadTextSize }}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ANGLE = 2;
const TIME = 60;
const EASING = Easing.elastic(1.5);

export const DialPadContainer = () => {
  const [code, setCode] = useState<number[]>([]);
  const rotation = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  //Se puede animar cuando el pin es invalido
  const handlePress = () => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        4,
        true
      ),
      // go back to 0 at the end
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
  };

  console.log("🚀 dial-pad.tsx -> #75 -> code ~", code);

  return (
    <>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            gap: pinSpacing * 2,
            marginBottom: _spacing * 2,
            // backgroundColor: "green",
            height: pinSize * 2,
            alignItems: "flex-end",
          },
          animatedStyle,
        ]}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i];
          return (
            <MotiView
              key={`pin-${i}`}
              style={{
                width: pinSize,
                // height: isSelected ? pinSize : 2,
                backgroundColor: "red",
                borderRadius: pinSize,
              }}
              transition={{
                type: "timing",
                duration: 200,
              }}
              // from={{ rotate: "0deg" }}
              animate={{
                // rotate: [
                //   "0deg",
                //   "-10deg",
                //   "10deg",
                //   "-8deg",
                //   "8deg",
                //   "-4deg",
                //   "4deg",
                //   "0deg",
                // ],
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
            />
          );
        })}
      </Animated.View>

      <DialPad
        onPress={(item) => {
          if (item === "del") {
            setCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
          } else if (typeof item === "number") {
            if (code.length === pinLength) return;
            setCode((prevCode) => [...prevCode, item]);
          }

          console.log("pressed", item);
        }}
      />

      <Button title="Wobble!" onPress={handlePress} />
    </>
  );
};
