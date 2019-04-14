// @flow
import React, { Component } from "react";
import { Animated, View, PanResponder, Text } from "react-native";

import styles, { BOX_SIZE, ROOT_HEIGHT } from "./styles";

class App extends Component<{}> {
  _animation = new Animated.ValueXY({ x: 0, y: 0 });

  _pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => this._animation.extractOffset(),
    onPanResponderMove: Animated.event([
      null,
      { dx: this._animation.x, dy: this._animation.y }
    ])
  });

  render() {
    const inputRange = [
      0,
      ROOT_HEIGHT / 2 - BOX_SIZE,
      ROOT_HEIGHT / 2,
      ROOT_HEIGHT
    ];

    const animatedBoxStyle = {
      backgroundColor: this._animation.y.interpolate({
        inputRange,
        outputRange: ["#0f0", "#0f0", "#f00", "#f00"]
      }),
      transform: [
        ...this._animation.getTranslateTransform(),
        {
          scale: this._animation.y.interpolate({
            inputRange,
            outputRange: [1, 1, -1, -1]
          })
        }
      ]
    };

    return (
      <View {...this._pan.panHandlers} style={styles.container}>
        <View style={styles.half}>
          <Text>Good</Text>
        </View>
        <View style={styles.half}>
          <Text>Bag</Text>
        </View>
        <Animated.View style={[styles.box, animatedBoxStyle]}>
          <Text>Box</Text>
        </Animated.View>
      </View>
    );
  }
}

export default App;
