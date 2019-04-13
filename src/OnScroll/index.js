// @flow
import React, { Component } from "react";
import { Animated, ScrollView } from "react-native";

import styles from "./styles";

class App extends Component<{}> {
  _animation = new Animated.Value(1);

  render() {
    const animatedBoxStyle = {
      backgroundColor: this._animation.interpolate({
        inputRange: [0, 3000],
        outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
      })
    };

    return (
      <ScrollView
        style={styles.container}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: this._animation
              }
            }
          }
        ])}
        scrollEventThrottle={16} // IOS only
      >
        <Animated.View style={[styles.box, animatedBoxStyle]} />
      </ScrollView>
    );
  }
}

export default App;
