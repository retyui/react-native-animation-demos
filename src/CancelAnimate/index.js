// @flow
import React, { Component } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

class App extends Component<{}, {| visible: boolean |}> {
  _animation = new Animated.Value(0);

  state = {
    visible: true
  };

  handlerOnPress = () => {
    Animated.timing(this._animation, {
      toValue: 500,
      duration: 1000,
      useNativeDriver: true
    }).start(({ finished }) => {
      // `finished` can be `false`
      // when you call  Animated.timing(this._animation, {...})
      // before previous Animated.timing is finished
      if (finished) {
        // unmount component
        this.setState({ visible: false });
      } else {
        setTimeout(() => {
          Animated.spring(this._animation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
          }).start();
        }, 0);
      }
    });
  };

  render() {
    const animatedStyle = {
      opacity: this._animation.interpolate({
        inputRange: [0, 500],
        outputRange: [1, 0]
      }),
      transform: [
        {
          translateY: this._animation
        }
      ]
    };

    return (
      <View style={styles.container}>
        {this.state.visible ? (
          <TouchableWithoutFeedback onPress={this.handlerOnPress}>
            <Animated.View style={[styles.box, animatedStyle]} />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}

export default App;
