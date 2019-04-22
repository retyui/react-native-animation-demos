// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Easing } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.Value(0);

  _animate(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 500,
      useNativeDriver: false,
      // easing: Easing.back(5),
      easing: Easing.bounce,
      // easing: Easing.elastic(3),
      // easing: Easing.bezier(0.06, 1, 0.86, 0.23),
      ...options
    }).start(cb);
  }

  handlerOnPress = () => {
    this._animate({ toValue: 1 }, () => this._animation.setValue(0));
  };

  render() {
    const animatedBoxStyle = {
      transform: [
        {
          rotate: this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"]
          })
        }
      ]
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
