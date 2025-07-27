import { HomeType } from "@/mock/home";
import { MotiView } from "moti";
import { Image, View, ViewProps } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const _spacing = 4;
const _borderRadius = 8;
const _itemSize = 60;
const _stagger = 75;
const _loadingColor = "#ddd";
const _loadingColorWashed = "#eee";

const getRandomRotation = () => {
  return Math.random() > 0.5 ? -1 : 1 * Math.random() * 15;
};

function LoadingSkeleton() {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(3).keys()].map((_, index) => {
        return (
          <Skeleton
            key={index}
            style={{
              width: _itemSize,
              aspectRatio: 1,
              borderRadius: _borderRadius,
              borderWidth: _spacing,
              borderColor: "#fff",
              backgroundColor: _loadingColor,
              marginLeft: index !== 0 ? -_itemSize / 2 : 0,
              transform: [
                {
                  rotate: `${getRandomRotation()}deg`,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
}

const Item = ({ item, index }: { item: HomeType; index: number }) => {
  return (
    <View
      style={{
        width: _itemSize,
        aspectRatio: 1,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        elevation: 5,
        marginLeft: index !== 0 ? -_itemSize / 2 : 0,
        transform: [
          {
            rotate: `${getRandomRotation()}deg`,
          },
        ],
      }}
    >
      <Image
        // source={{ uri: "https://picsum.photos/seed/1Fazf9vztv/80/80" }}
        source={{ uri: `https://i.pravatar.cc/50?u=${item.name}` }}
        style={{
          flex: 1,
          borderRadius: _borderRadius,
        }}
      />
    </View>
  );
};

export function Skeleton({ style, ...rest }: ViewProps) {
  return (
    <MotiView
      {...rest}
      style={[style]}
      from={{
        backgroundColor: _loadingColor,
      }}
      animate={{
        backgroundColor: _loadingColorWashed,
      }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
    />
  );
}

export const AvailabilityAnimation = ({
  data,
  isLoading,
}: {
  data: HomeType[];
  isLoading: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: _itemSize,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          minHeight: _itemSize,
        }}
      >
        {!isLoading ? (
          <Animated.Text
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
          >
            {data.length} available
          </Animated.Text>
        ) : (
          <Skeleton
            style={{
              width: "80%",
              height: _itemSize * 0.25,
              borderRadius: _borderRadius / 2,
              backgroundColor: _loadingColor,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          minHeight: _itemSize,
        }}
      >
        {!isLoading ? (
          data.map((item, index) => {
            return (
              <Animated.View
                style={{ zIndex: index }}
                key={item.key}
                entering={ZoomIn.springify()
                  .stiffness(200)
                  .damping(80)
                  .delay(index * _stagger)}
                exiting={ZoomOut.springify()
                  .stiffness(200)
                  .damping(80)
                  .delay(index * _stagger)}
              >
                <Item item={item} index={index} />
              </Animated.View>
            );
          })
        ) : (
          <LoadingSkeleton />
        )}
      </View>
    </View>
  );
};
