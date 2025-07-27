import { DataType } from "@/mock/data";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface CardProps {
  item: DataType;
  index: number;
  dataLength: number;
  maxVisibleItem: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  setNewData: React.Dispatch<React.SetStateAction<DataType[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  newData: DataType[];
}

export const Card = ({
  item,
  index,
  dataLength,
  maxVisibleItem,
  currentIndex,
  animatedValue,
  setCurrentIndex,
  setNewData,
  newData,
}: CardProps) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      // e.translationX es la distancia del swipe
      // e.translationX es positivo si el swipe es hacia la derecha
      // isSwipeRight es true si el swipe es hacia la derecha
      const isSwipingRight = event.translationX > 0;

      // direction 1 es derecha, -1 es izquierda
      direction.value = isSwipingRight ? 1 : -1;

      // Si el índice actual es el mismo que el índice de la tarjeta
      if (currentIndex === index) {
        translateX.value = event.translationX;
        animatedValue.value = interpolate(
          Math.abs(event.translationX),
          [0, width],
          [index, index + 1]
        );
      }
    })
    .onEnd((event) => {
      if (currentIndex === index) {
        // Si la distancia del swipe es mayor a 150 o la velocidad del swipe es mayor a 1000
        // ir a la siguiente tarjeta
        if (
          Math.abs(event.translationX) > 80 ||
          Math.abs(event.translationX) > 1000
        ) {
          translateX.value = withSpring(
            width * direction.value,
            {
              // Permite que la animación sea más rápida al momento de mover la siguiente tarjeta
              duration: 300,
            },
            () => {
              //Loop infinito
              runOnJS(setNewData)([...newData, newData[currentIndex]]);
              //Se actualiza el index
              runOnJS(setCurrentIndex)(currentIndex + 1);
            }
          );
          //Animación al mover
          animatedValue.value = withSpring(currentIndex + 1);

          // Si la distancia del swipe es menor a 150 o la velocidad del swipe es menor a 1000
          // regresar a la posición original
        } else {
          translateX.value = withSpring(0, { duration: 500 });
          animatedValue.value = withSpring(currentIndex);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = currentIndex === index;

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20]
    );

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-30, 0]
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1]
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index, index + 1],
      [0, 1]
    );

    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          // Al moverse la tarjeta, las demás se escalan
          scale: currentItem ? 1 : scale,
        },
        {
          //Al moverse la tarjeta, las demás se mueven hacia abajo
          translateY: currentItem ? 0 : translateY,
        },
        {
          // Rotar solo la tarjeta que se mueve
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg",
        },
      ],

      //La tarjeta que se mueve se vuelve transparente y aparece al final
      opacity: index < maxVisibleItem + currentIndex ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: item.backgroundColor,
            zIndex: dataLength - index,
          },
          animatedStyle,
        ]}
      >
        <View style={styles.top}>
          <Text style={styles.textName}>{item.name}</Text>

          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={styles.textNumber}>{item.number}</Text>
        </View>

        <View style={styles.bottom}>
          <View>
            <Text style={styles.text}>Valid thru</Text>
            <Text style={styles.text}>{item.exp}</Text>
          </View>
          <View>
            <Text style={styles.text}>CVV</Text>
            <Text style={styles.text}>{item.cvv}</Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 300,
    height: 200,
    borderRadius: 15,
    padding: 16,
  },
  imageContainer: {
    width: 70,
    height: 30,
  },
  image: {
    width: 70,
    height: 30,
    resizeMode: "contain",
  },
  textName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middle: {
    flex: 2,
    justifyContent: "center",
  },
  textNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    gap: 56,
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});
