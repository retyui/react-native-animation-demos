// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

class App extends Component<{}> {
  _animation = new Animated.Value(0);

  handlerOnPress = () => {
    Animated.timing(this._animation, {
      toValue: 2,
      duration: 500
    }).start(() => this._animation.setValue(0));
  };

  render() {
    const animatedBoxStyle = {
      backgroundColor: this._animation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ["rgb(71,255,99)", "rgb(255,99,71)", "rgb(90,71,255)"]
      })
    };

    const animatedContainerStyle = {
      backgroundColor: this._animation.interpolate({
        inputRange: [0, 2],
        outputRange: ["rgba(255,99,71,1)", "rgba(255,99,71,0)"]
      })
    };

    return (
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

export default App;
