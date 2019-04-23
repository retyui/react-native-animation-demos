// @flow
import React, { Component } from "react";
import {
  Animated,
  View,
  ScrollView,
  TextInput,
  Text,
  PanResponder
} from "react-native";
import styles from "./styles";
import type { ScrollEvent } from "react-native/Libraries/Types/CoreEventTypes";

type Props = {||};

export default class App extends Component<Props> {
  animated = new Animated.Value(0);
  animatedMargin = new Animated.Value(0);

  scrollOffset: number = 0;
  contentHeight: number = 0;
  scrollViewHeight: number = 0;

  onScroll = (event: ScrollEvent) => {
    this.scrollOffset = event.nativeEvent.contentOffset.y;
    this.scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
  };

  onContentSizeChange = (_: number, contentHeight: number) => {
    this.contentHeight = contentHeight;
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dy } = gestureState;
      const totalScrollHeight = this.scrollOffset + this.scrollViewHeight;

      if (
        (this.scrollOffset <= 0 && dy > 0) ||
        (totalScrollHeight >= this.contentHeight && dy < 0)
      ) {
        return true;
      }

      return false;
    },
    onPanResponderMove: (e, gestureState) => {
      const { dy } = gestureState;

      if (dy < 0) {
        this.animated.setValue(dy);
      } else if (dy > 0) {
        this.animatedMargin.setValue(dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dy } = gestureState;

      // Animate away over the top
      if (dy < -150) {
        Animated.parallel([
          Animated.timing(this.animated, { toValue: -400, duration: 150 }),
          Animated.timing(this.animatedMargin, { toValue: 0, duration: 150 })
        ]).start();
        //Animate back to start position
      } else if (dy > -150 && dy < 150) {
        Animated.parallel([
          Animated.timing(this.animated, { toValue: 0, duration: 150 }),
          Animated.timing(this.animatedMargin, { toValue: 0, duration: 150 })
        ]).start();
      } else if (dy > 150) {
        Animated.timing(this.animated, { toValue: 400, duration: 300 }).start();
      }
    }
  });

  render() {
    const opacityInterpolate = this.animated.interpolate({
      inputRange: [-400, 0, 400],
      outputRange: [0, 1, 0]
    });

    const spacerStyle = {
      marginTop: this.animatedMargin
    };
    const animatedModalStyle = {
      opacity: opacityInterpolate,
      transform: [{ translateY: this.animated }]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={spacerStyle} />
        <Animated.View
          style={[styles.modal, animatedModalStyle]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.comments}>
            <ScrollView
              onScroll={this.onScroll}
              onContentSizeChange={this.onContentSizeChange}
              // iOS only
              scrollEventThrottle={16}
            >
              <Text style={styles.fakeText}>Top</Text>
              <View style={styles.fakeComments} />
              <Text style={styles.fakeText}>Bottom</Text>
            </ScrollView>
          </View>
          <View style={styles.inputWrap}>
            <TextInput style={styles.textInput} placeholder="Comment" />
          </View>
        </Animated.View>
      </View>
    );
  }
}
