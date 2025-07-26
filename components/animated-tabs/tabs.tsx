import { icons } from "lucide-react-native";
import { MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";
import { Pressable, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from "react-native-reanimated";

type iconNames = keyof typeof icons;
type TabItem = {
  icon: iconNames;
  label: string;
};
type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

type IconProps = {
  name: iconNames;
  size?: number;
  color?: string;
};

function Icon({ name, ...rest }: IconProps & MotiProps) {
  // eslint-disable-next-line import/namespace
  const LucideIcon = motifySvg(icons[name])();

  if (!LucideIcon) return null;

  return <LucideIcon size={16} {...rest} />;
}

const _spacing = 4;

export const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd",
}: TabsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: _spacing,
      }}
    >
      {data.map((item, index) => {
        const isSelected = index === selectedIndex;
        return (
          <MotiView
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              overflow: "hidden",
              borderRadius: 8,
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
            key={`tab-${index}`}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={{
                padding: _spacing * 3,
                justifyContent: "center",
                alignItems: "center",
                gap: _spacing,
                flexDirection: "row",
              }}
            >
              <Icon
                name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
              />

              <LayoutAnimationConfig skipEntering>
                {isSelected && (
                  <Animated.Text
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={{ color: isSelected ? activeColor : inactiveColor }}
                  >
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};
