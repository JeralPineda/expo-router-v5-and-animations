import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  clamp,
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const images = [
  "https://cdn.dribbble.com/userupload/36936597/file/original-ef56a8dff0076e3dd66b5edc13ddafdb.jpg?resize=752x&vertical=center",
  "https://cdn.dribbble.com/userupload/36851346/file/original-153c6545cef1ca99fcc8c29c84f97996.jpg?resize=752x&vertical=center",
  "https://cdn.dribbble.com/userupload/36577254/file/original-6b9d1e85900438dc5f7d2823f1315f14.jpg?resize=752x&vertical=center",
  "https://cdn.dribbble.com/userupload/28002315/file/original-940ec0ab385630cb984245faf1a5b910.jpg?resize=752x&vertical=center",
  "https://cdn.dribbble.com/userupload/27918277/file/original-789dad2c7d86b102936d8813358ed669.jpg?resize=752x&vertical=center",
  "https://cdn.dribbble.com/userupload/42408881/file/original-9d6e5411740f84dfc8d6055511980f01.jpeg?resize=1598x1199",
  "https://cdn.dribbble.com/userupload/36937548/file/original-83fd7df0bb26e18b2b92bf11b03c17f6.jpg?resize=752x&vertical=center",
];

const { width } = Dimensions.get("window");
const _itemSize = width * 0.24;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

function CarouselItem({
  imageUri,
  index,
  scrollX,
}: {
  imageUri: string;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ["transparent", "#fff", "transparent"]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
        },
        stylez,
      ]}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
}

export const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    //* Se agrega clamp para que no se salga del rango al hacer scroll (no podra ir mas alla de la ultima imagen y la primera)
    scrollX.value = clamp(
      e.contentOffset.x / _itemTotalSize,
      0,
      images.length - 1
    );
    const newActiveIndex = Math.round(scrollX.value);

    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#000",
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.Image
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
        />
      </View>
      <Animated.FlatList
        style={{
          flexGrow: 0,
          height: _itemSize * 2,
        }}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _itemSize) / 2,
        }}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <CarouselItem imageUri={item} index={index} scrollX={scrollX} />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        // scrolling
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // -16ms
        snapToInterval={_itemTotalSize} // El scroll al detenerse se queda en el medio del elemento
        decelerationRate="fast"
      />
    </View>
  );
};
