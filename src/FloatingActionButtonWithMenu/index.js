// @flow
import React, { Component, type Element } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  Alert
} from "react-native";

import styles, { BUTTON_SIZE, BUTTON_OFFSET } from "./styles";

const window = Dimensions.get("window");
const maxSize = Math.max(window.width, window.height);
const backgroundScaleFactor = ((maxSize + BUTTON_OFFSET) / BUTTON_SIZE) * 2;

const getAnimateValueByFlag = (isOpen: boolean): number => (isOpen ? 1 : 0);

type ButtonOptions = {|
  content: Element<any>,
  onPress: () => void,
  style: any
|};

type Props = {||};
class App extends Component<Props> {
  _isOpen = true;
  _animation = new Animated.Value(getAnimateValueByFlag(this._isOpen));

  openMenu = () => {
    const toValue = getAnimateValueByFlag((this._isOpen = !this._isOpen));

    Animated.spring(this._animation, {
      toValue,
      useNativeDriver: true
    }).start();
  };

  _animatedBgStyle = {
    transform: [
      {
        scale: this._animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, backgroundScaleFactor],
          extrapolate: "clamp"
        })
      }
    ]
  };

  _animatedLabelStyle = {
    transform: [
      { translateX: -80 },
      {
        scale: this._animation.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [0, 0, 1]
        })
      }
    ]
  };

  _button: Array<ButtonOptions> = [
    {
      content: (
        <>
          <Animated.Text style={[styles.label, this._animatedLabelStyle]}>
            Order
          </Animated.Text>
          <Text style={styles.subButtonText}>📤</Text>
        </>
      ),
      style: styles.subButton,
      onPress: () => {
        Alert.alert("onPress Order");
      }
    },
    {
      content: (
        <>
          <Animated.Text style={[styles.label, this._animatedLabelStyle]}>
            Cancel
          </Animated.Text>
          <Text style={styles.subButtonText}>❌</Text>
        </>
      ),
      style: styles.subButton,
      onPress: () => {
        Alert.alert("onPress Cancel");
      }
    }
  ];

  renderAnimatedButton(
    { content, onPress, style }: ButtonOptions,
    index: number
  ) {
    const animatedStyle = {
      transform: [
        {
          scale: this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp"
          })
        },
        {
          translateY: this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (index + 1) * -(BUTTON_SIZE + 10)],
            extrapolate: "clamp"
          })
        }
      ]
    };

    return (
      <TouchableWithoutFeedback key={index} onPress={onPress}>
        <Animated.View style={[styles.button, style, animatedStyle]}>
          {content}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <>
          <Animated.View style={[styles.background, this._animatedBgStyle]} />
          {this._button.map((button, index) =>
            this.renderAnimatedButton(button, index)
          )}
          <TouchableWithoutFeedback onPress={this.openMenu}>
            <View style={[styles.button, styles.openButton]}>
              <Animated.Text style={[styles.label, this._animatedLabelStyle]}>
                Pay
              </Animated.Text>
              <Text style={styles.buttonText}>5.00 $</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      </View>
    );
  }
}

export default App;
