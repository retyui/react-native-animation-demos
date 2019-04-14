// @flow
import React, { Component, createRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolate } from "flubber";

import styles from "./styles";

const startPath = `M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z`;
const endPath = `M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`;

const pathInterpolate = interpolate(startPath, endPath, {
  startSegmentLength: 1
});

class App extends Component<{}> {
  _animation = new Animated.Value(0);

  _pathRef = createRef<Path>();

  componentDidMount(): void {
    this._animation.addListener(({ value }) => {
      const pathAttr = pathInterpolate(value);

      const { current: path } = this._pathRef;

      if (path) {
        path.setNativeProps({
          d: pathAttr
        });
      }
    });
  }

  handlerOnPress = () => {
    Animated.sequence([
      Animated.timing(this._animation, {
        toValue: 1,
        duration: 250
      }),
      Animated.delay(1000),
      Animated.timing(this._animation, {
        toValue: 0,
        duration: 250
      })
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlerOnPress}>
          <Svg width={240} height={240}>
            <Path fill="red" scale={10} ref={this._pathRef} d={startPath} />
          </Svg>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default App;
