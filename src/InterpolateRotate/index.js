// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

class App extends Component<{}> {
  _animation = new Animated.Value(0);

  handlerOnPress = () => {
    Animated.timing(this._animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => this._animation.setValue(0));
  };

  render() {
    const animatedBoxStyle = {
      transform: [
        {
          rotateX: this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
          })
        },
        {
          rotateY: this._animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "0deg", "360deg"]
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
