import Ionicons from "@expo/vector-icons/Ionicons";
import { OpaqueColorValue, TextStyle } from "react-native";

type SFSymbols6_0 =
  | "albums-outline"
  | "chevron-forward"
  | "options"
  | "swap-vertical"
  | "chevron-back"
  | "list"
  | "keypad-outline"
  | "backspace-outline"
  | "trophy-outline"
  | "accessibility-outline";

const MAPPING: Record<
  SFSymbols6_0,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  "albums-outline": "albums-outline",
  "chevron-forward": "chevron-forward",
  options: "options",
  "swap-vertical": "swap-vertical",
  "chevron-back": "chevron-back",
  list: "list",
  "keypad-outline": "keypad-outline",
  "backspace-outline": "backspace-outline",
  "trophy-outline": "trophy-outline",
  "accessibility-outline": "accessibility-outline",
};

export type IonIconName = keyof typeof MAPPING;

interface IconProps {
  name: IonIconName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: TextStyle;
}

export function IconIon({
  name,
  size = 24,
  color = "black",
  style,
}: IconProps) {
  return (
    <Ionicons name={MAPPING[name]} size={size} color={color} style={style} />
  );
}
