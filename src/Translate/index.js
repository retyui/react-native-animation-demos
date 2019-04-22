// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.Value(0);

  _animateBox(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 1500,
      useNativeDriver: true,
      ...options
    }).start(cb);
  }
  toDown(cb?: () => void) {
    return this._animateBox({ toValue: -300 }, cb);
  }

  handlerOnPress = () => {
    this.toDown(() => {
      this._animation.setValue(0);
    });
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          translateY: this._animation
        }
      ]
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
