// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.Value(0);

  _animate(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 1500,
      useNativeDriver: false, // width and height not supported native animated module
      ...options
    }).start(cb);
  }

  handlerOnPress = () => {
    this._animate({ toValue: 1 }, () => {
      this._animate({ toValue: 0 });
    });
  };

  render() {
    const animatedBoxStyle = {
      width: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["20%", "50%"]
      }),
      height: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["20%", "30%"]
      })
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
