// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.Value(1);

  handlerOnPress = () => {
    return Animated.spring(this._animation, {
      toValue: 2,
      // friction: 2,
      // tension: 160,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this._animation, {
        duration: 250,
        toValue: 1,
        useNativeDriver: true
      }).start();
    });
  };

  render() {
    const animatedBoxStyle = {
      transform: [
        {
          scale: this._animation
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
