// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

type Props = {||};

class App extends Component<Props> {
  _animation = new Animated.Value(0);

  _animateBox(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 250,
      useNativeDriver: false, // width and height not supported native animated module
      ...options
    }).start(cb);
  }

  handlerOnPress = () => {
    this._animateBox({ toValue: 40 });
  };

  render() {
    const animatedStyle = {
      top: this._animation,
      left: this._animation,
      right: this._animation
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
