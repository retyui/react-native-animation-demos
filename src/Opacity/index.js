// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

import type { TimingAnimationConfig } from "TimingAnimation";

class App extends Component<{}> {
  _animation = new Animated.Value(1);

  _animateBox(options: TimingAnimationConfig, cb?: () => void) {
    return Animated.timing(this._animation, {
      duration: 250,
      useNativeDriver: true,
      ...options
    }).start(cb);
  }
  hideBox(cb?: () => void) {
    return this._animateBox({ toValue: 0 }, cb);
  }

  showBox(cb?: () => void) {
    return this._animateBox({ toValue: 1 }, cb);
  }

  handlerOnPress = () => {
    this.hideBox(() => {
      this.showBox();
    });
  };

  render() {
    const animatedStyle = {
      opacity: this._animation
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
