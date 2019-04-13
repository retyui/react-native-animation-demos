// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

class App extends Component<{}> {
  _animation = new Animated.Value(200);

  _animateBox(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 1500,
      useNativeDriver: false, // width and height not supported native animated module
      ...options
    }).start(cb);
  }

  handlerOnPress = () => {
    this._animateBox({ toValue: 300 });
  };

  render() {
    const animatedStyle = {
      width: this._animation,
      height: this._animation
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <Text>
              Long text inside. Long text inside. Long text inside. Long text
              inside. Long text inside. Long text inside. Long text inside.
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
