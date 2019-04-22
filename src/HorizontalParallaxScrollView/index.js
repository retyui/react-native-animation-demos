// @flow
import React, { Component } from "react";
import { Animated, Dimensions, ScrollView } from "react-native";

import { images } from "./data";
import Slide from "./Slide";
import styles from "./styles";

const { width } = Dimensions.get("window");

const getInterpolate = (animValue, i) => {
  const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
  const outputRange = i === 0 ? [0, 0, 50] : [-100, 0, 50];

  return animValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  });
};

class App extends Component<{||}> {
  _animatedScroll = new Animated.Value(0);

  _onScroll = Animated.event([
    {
      nativeEvent: {
        contentOffset: { x: this._animatedScroll }
      }
    }
  ]);

  render() {
    return (
      <ScrollView
        pagingEnabled
        horizontal
        style={styles.container}
        onScroll={this._onScroll}
        // iOS only
        scrollEventThrottle={16}
      >
        {images.map((imageProps, key) => (
          <Slide
            key={key}
            {...imageProps}
            translateX={getInterpolate(this._animatedScroll, key)}
          />
        ))}
      </ScrollView>
    );
  }
}

export default App;
