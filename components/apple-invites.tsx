import { images } from "@/lib/utils";
import { Marquee } from "@animatereactnative/marquee";
import { Stagger } from "@animatereactnative/stagger";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _borderRadius = 16;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

function Item({
  image,
  index,
  offset,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
}) {
  //Rotacion de la imagen, cuando va saliendo dependiendo de la dirección del scroll
  const stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = images.length * _itemSize;

    const range =
      ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) +
      width +
      _itemSize / 2;

    return {
      transform: [
        {
          rotate: `${interpolate(
            range,
            [-_itemSize, width - _itemSize / 2, width],
            [-3, 0, 3]
          )}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemWidth,
          height: _itemHeight,
          borderRadius: _borderRadius,
        },
        stylez,
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{
          flex: 1,
          borderRadius: _borderRadius,
        }}
      />
    </Animated.View>
  );
}

export const AppleInvites = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useAnimatedReaction(
    () => {
      //Calculamos el indice => 1.22, 2.334

      //* offset.value + width / 2) Esto hara que cada vez que la imagen que va saliendo y este la mitad del borde cambia a la siguiente
      const floatIndex =
        ((offset.value + width / 2) / _itemSize) % images.length;
      //Math.floor redondea hacia abajo => 1, 2 (Peros si hacemos scroll hacia la izquierda, el valor es negativo)
      //Math.abs redondea hacia el valor absoluto => 1, 2
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      // calculate the index
      // setState with the index
      runOnJS(setActiveIndex)(value);
    }
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.5, //* Si aplico no da alerta de duplicidad por aplicar esta linea en la imagen por que ya esta aplicando con Animated.Image entering y exiting

            //! Es mas facil manipular la imagen de esta forma, cuando la imagen se expande a todo el contenedor
          },
        ]}
      >
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>

      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}
          style={{
            flexDirection: "row",
            gap: _spacing,
          }}
        >
          {images.map((image, index) => {
            return (
              <Item
                key={`image-${index}`}
                image={image}
                index={index}
                offset={offset}
              />
            );
          })}
        </Animated.View>
      </Marquee>

      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        stagger={100}
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#ffffffa5",
            fontWeight: "500",
            // opacity: 0.8,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: _spacing,
          }}
        >
          Jeral Cristopher Pineda
        </Text>
        <Text
          style={{
            color: "#ffffffa5",
            // opacity: 0.8, //Lanza warning de opacidad duplicada
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          An extensive collection of more than{" "}
          <Text style={{ fontWeight: "bold" }}>100+</Text> react native
          animations meticulously crafted and ready to use
        </Text>
      </Stagger>
    </View>
  );
};
