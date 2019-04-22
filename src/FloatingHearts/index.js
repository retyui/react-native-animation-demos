// @flow
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated
} from "react-native";

import Heart from "./Heart";
import { HEART_WIDTH, HEART_HEIGHT } from "./Heart.styles";
import styles from "./styles";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEven = num => num % 2 === 0;

type State = {|
  hearts: Array<{|
    id: string,
    animated: any,
    startOffsetX: number
  |}>
|};

const createWobbleInterpolate = (
  animated: any,
  {
    outputWidth,
    count,
    inputWidth
  }: { count: number, inputWidth: number, outputWidth: number }
) => {
  const inputRange = [...new Array(count)].map(
    (_, index) => index * inputWidth
  );
  const outputRange = [...new Array(count)].map((_, index) =>
    isEven(index) ? outputWidth : -outputWidth
  );

  return animated.interpolate({
    inputRange,
    outputRange
  });
};

class App extends Component<{||}, State> {
  state = {
    hearts: []
  };

  removeHeartById(id: string) {
    this.setState(({ hearts }) => ({
      hearts: hearts.filter(e => e.id !== id)
    }));
  }

  addHeart = () => {
    const animated = new Animated.Value(0);
    const id = Math.random().toString();

    this.setState(
      ({ hearts }) => ({
        hearts: [
          ...hearts,
          {
            id,
            animated,
            startOffsetX: getRandomInt(0, windowWidth - HEART_WIDTH)
          }
        ]
      }),
      () => {
        Animated.timing(animated, {
          useNativeDriver: true,
          toValue: windowHeight,
          duration: 1234
        }).start(() => {
          this.removeHeartById(id);
        });
      }
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.addHeart}>
        <View style={styles.container}>
          {this.state.hearts.map(({ id, animated, startOffsetX }) => {
            const yInterpolate = animated.interpolate({
              inputRange: [0, windowHeight],
              outputRange: [windowHeight - HEART_HEIGHT, 0]
            });

            const opacityInterpolate = animated.interpolate({
              inputRange: [0, windowHeight],
              outputRange: [1, 0]
            });

            const scaleInterpolate = animated.interpolate({
              inputRange: [0, 100, 200],
              outputRange: [0.2, 2, 1],
              extrapolate: "clamp"
            });

            const count = 4;
            const xInterpolate = createWobbleInterpolate(animated, {
              count,
              outputWidth: 15,
              inputWidth: windowHeight / count
            });

            const heartStyle = {
              left: startOffsetX,
              transform: [
                { translateY: yInterpolate },
                { translateX: xInterpolate },
                { scale: scaleInterpolate },
                { rotate: "45deg" }
              ],
              opacity: opacityInterpolate
            };

            return <Heart key={id} style={heartStyle} />;
          })}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default App;
