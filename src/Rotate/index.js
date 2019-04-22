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
      useNativeDriver: true,
      ...options
    }).start(cb);
  }

  handlerOnPress = () => {
    this._animate({ toValue: 360 }, () => {
      this._animate({ toValue: 0 });
    });
  };

  render() {
    const animatedBoxStyle = {
      transform: [
        {
          rotate: this._animation.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "-360deg"]
          })
        }
      ]
    };

    const animatedTextStyle = {
      transform: [
        {
          rotate: this._animation.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "360deg"]
          })
        },
        {
          scale: this._animation.interpolate({
            inputRange: [0, 180, 360],
            outputRange: [1, 1.5, 1]
          })
        }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>
              Hello Rotate!
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
