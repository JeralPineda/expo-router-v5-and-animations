import { Image, View } from "react-native";
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const users = [
  { name: "John", score: 12 },
  { name: "Jane", score: 22 },
  { name: "Bob", score: 4 },
  { name: "Alice", score: 15 },
  { name: "Mark", score: 33 },
  { name: "Lily", score: 10 },
  { name: "Liam", score: 31 },
];

type PlaceProps = {
  user: (typeof users)[0];
  index: number;
  onFinish?: () => void;
  anim: SharedValue<number>;
};

// Constants
const _avatarSize = 28;
const _spacing = 4;
const _stagger = 50;

function Place({ user, index, onFinish, anim }: PlaceProps) {
  const _anim = useDerivedValue(() => {
    return withDelay(
      _stagger * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      })
    );
  });

  const stylez = useAnimatedStyle(() => {
    return {
      // height: user.score * 3 * _anim.value,
      height: interpolate(
        _anim.value,
        [0, 1],
        [_avatarSize, Math.max(user.score * 3, _avatarSize + _spacing)]
      ),
      backgroundColor:
        index === 4
          ? interpolateColor(
              _anim.value,
              [0, 1],
              ["rgba(0,0,0,0.1)", "turquoise"]
            )
          : "rgba(0,0,0,0.1)",
    };
  });

  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0, 1], [0, 0, 1]),
    };
  });

  return (
    <Animated.View
      style={{
        alignItems: "center",
      }}
      entering={FadeInRight.delay(_stagger * index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback((finished) => {
          "worklet";

          if (finished && onFinish) {
            runOnJS(onFinish)();
          }
        })}
    >
      <Animated.Text
        style={[
          {
            fontSize: 7,
            fontWeight: "700",
          },
          textStylez,
        ]}
      >
        {user.score}
      </Animated.Text>

      <Animated.View
        style={[
          {
            backgroundColor: "rgba(0,0,0,0.1)",
            // width: _avatarSize,
            height: _avatarSize,
            borderRadius: _avatarSize,
          },
          stylez,
        ]}
      >
        <View
          style={{
            width: _avatarSize,
            aspectRatio: 1,
          }}
        >
          <Image
            source={{ uri: `https://i.pravatar.cc/50?u=${user.name}` }}
            style={{
              flex: 1,
              borderRadius: _avatarSize,
              aspectRatio: 1,
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

export const LeaderBoard = () => {
  const _anim = useSharedValue(0);

  return (
    <View>
      <View
        style={{
          height: 200,
          flexDirection: "row",
          gap: _spacing,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {users.map((user, index) => (
          <Place
            key={index}
            user={user}
            index={index}
            onFinish={
              index === users.length - 1
                ? () => {
                    _anim.value = 1;
                    console.log("has finished", index);
                  }
                : undefined
            }
            anim={_anim}
          />
        ))}
      </View>
    </View>
  );
};
