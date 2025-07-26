import { MotiView } from "moti";
import { useState } from "react";
import { Text, TextProps, View } from "react-native";

type TickerListProps = {
  number: number;
  fontSize: number;
  index: number;
};

const numbersToNice = [...Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const _stagger = 50;

function Tick({
  children,
  fontSize,
  style,
  ...rest
}: TextProps & { fontSize: number }) {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize,
          lineHeight: fontSize * 1.1,
          fontWeight: "900",
          fontVariant: ["tabular-nums"],
        },
      ]}
    >
      {children}
    </Text>
  );
}

const TickerList = ({ number, fontSize, index }: TickerListProps) => {
  return (
    <View
      style={{
        height: fontSize,
        overflow: "hidden",
      }}
    >
      <MotiView
        animate={{
          translateY: -fontSize * 1.1 * number,
        }}
        transition={{
          delay: index * _stagger, //Retraso de la animación
          damping: 80, // cambiar la elasticidad de la animación
          stiffness: 200, // cambiar la rigidez de la animación
        }}
      >
        {numbersToNice.map((num, index) => (
          <Tick key={`num-${num}-${index}`} fontSize={fontSize}>
            {num}
          </Tick>
        ))}
      </MotiView>
    </View>
  );
};

export const Ticker = ({
  value,
  fontSize = 50,
}: {
  value: number;
  fontSize?: number;
}) => {
  const intNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  const splittedValue = intNumber.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);

  return (
    <View>
      <Text>Prop fontSize: {fontSize}</Text>
      <Text>Calculated fontSize: {newFontSize}</Text>
      <Tick
        fontSize={fontSize}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          position: "absolute",
          left: 1000000,
          top: 1000000,
        }}
        onTextLayout={(e) => {
          setNewFontSize(e.nativeEvent.lines[0].ascender);
        }}
      >
        {intNumber}
      </Tick>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {splittedValue.map((number, index) => {
          if (!isNaN(parseInt(number))) {
            return (
              <TickerList
                fontSize={newFontSize} //Ajusta el tamaño de la fuente para que quepa en una línea
                number={parseInt(number)}
                index={index}
                key={index}
              />
            );
          }

          return (
            <Tick key={index} fontSize={newFontSize} style={{ opacity: 0.2 }}>
              {number}
            </Tick>
          );
        })}
      </View>
    </View>
  );
};
