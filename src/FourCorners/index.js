// @flow
import React, { Component } from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import styles from "./styles";
import type { ViewLayoutEvent } from "ViewPropTypes";

const { width, height } = Dimensions.get("window");

type Props = {||};
class App extends Component<Props> {
  _animation = new Animated.ValueXY({ x: 0, y: 0 });
  _w: number = 0;
  _h: number = 0;

  handlerOnPress = () => {
    Animated.sequence([
      Animated.spring(this._animation.x, {
        toValue: width - this._w
      }),
      Animated.spring(this._animation.y, {
        toValue: height - this._h
      }),
      Animated.spring(this._animation.x, {
        toValue: 0
      }),
      Animated.spring(this._animation.y, {
        toValue: 0
      })
    ]).start();
  };

  handlerOnLayout = ({
    nativeEvent: {
      layout: { width, height }
    }
  }: ViewLayoutEvent) => {
    this._w = width;
    this._h = height;
  };

  render() {
    const animatedBoxStyle = {
      transform: this._animation.getTranslateTransform()
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={this.handlerOnPress}
          onLayout={this.handlerOnLayout}
        >
          <Animated.View style={[styles.box, animatedBoxStyle]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
