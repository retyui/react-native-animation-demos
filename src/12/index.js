// @flow
import React, { Component } from "react";
import { Animated, View, PanResponder } from "react-native";

import styles from "./styles";

class App extends Component<{}> {
  _animation = new Animated.ValueXY({ x: 0, y: 0 });

  _pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this._animation.extractOffset();
    },
    onPanResponderRelease: (_, { vx: x, vy: y }) => {
      Animated.decay(this._animation, {
        velocity: { x, y },
        deceleration: 0.997
      }).start();
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this._animation.x, dy: this._animation.y }
    ])
  });

  render() {
    const animatedBoxStyle = {
      transform: this._animation.getTranslateTransform()
    };

    return (
      <View {...this._pan.panHandlers} style={styles.container}>
        <Animated.View style={[styles.box, animatedBoxStyle]} />
      </View>
    );
  }
}

export default App;
