// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

type Props = {||};
class App extends Component<Props> {
  _scaleAnimation = new Animated.Value(1);
  _colorAnimation = new Animated.Value(0);

  handlerOnPress = () => {
    Animated.parallel([
      Animated.timing(this._colorAnimation, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this._scaleAnimation, {
        toValue: 2,
        duration: 300
      })
    ]).start();
  };

  render() {
    const animatedBoxStyle = {
      backgroundColor: this._colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
      }),
      transform: [
        {
          scale: this._scaleAnimation
        }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]}>
            <Text style={[styles.text]}>Hello Animation!</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
