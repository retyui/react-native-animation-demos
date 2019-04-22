// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View, Text } from "react-native";

import styles from "./styles";

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.Value(0);

  handlerOnPress = () => {
    Animated.timing(this._animation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true
    }).start(() => this._animation.setValue(0));
  };

  render() {
    const animatedInterpolate = this._animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0]
    });

    const animatedBoxStyle = {
      opacity: animatedInterpolate.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0.3]
      }),
      transform: [
        {
          translateY: animatedInterpolate
        },
        {
          translateX: animatedInterpolate.interpolate({
            inputRange: [0, 20, 50, 80, 130, 160, 250, 300],
            outputRange: [0, -20, 0, 20, 0, -20, 0, 20]
          })
        }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Animated.View style={[styles.box, animatedBoxStyle]}>
            <Text>Hello Animation!</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
