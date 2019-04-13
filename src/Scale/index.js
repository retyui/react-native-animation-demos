// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

class App extends Component<{}> {
  _animation = new Animated.Value(1);

  _animateBox(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 1500,
      useNativeDriver: true,
      ...options
    }).start(cb);
  }
  scaleX2(cb?: () => void) {
    return this._animateBox({ toValue: -2 }, cb);
  }

  handlerOnPress = () => {
    this.scaleX2(() => {
      this._animation.setValue(0);
    });
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          scaleY: this._animation
        }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <Text>Text inside</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
