// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

class App extends Component<{}> {
  _animation = new Animated.Value(1);

  handlerOnPress = () => {
    Animated.timing(this._animation, {
      toValue: 3,
      duration: 500,
      useNativeDriver: true
    }).start(() =>
      Animated.timing(this._animation, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }).start()
    );
  };

  render() {
    const animatedBoxStyle = {
      transform: [
        {
          scale: this._animation.interpolate({
            inputRange: [1, 2],
            outputRange: [1, 2],
            extrapolate: "clamp",
            // extrapolate: "extend",
            // extrapolateLeft: "clamp",
            // extrapolateRight: "clamp"
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
