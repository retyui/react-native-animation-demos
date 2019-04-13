// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

class App extends Component<{}> {
  _animation = new Animated.Value(0);

  _animate(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 1500,
      useNativeDriver: false, // backgroundColor not supported native animated module
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
      backgroundColor: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
      })
    };

    const animatedTextStyle = {
      color: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(99,71,255)", "rgb(255,99,71)"]
      })
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>
              Hello Animation!
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
