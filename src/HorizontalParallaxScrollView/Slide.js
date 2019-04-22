// @flow
import React, { Component } from "react";
import { Animated, View, Text } from "react-native";

import styles from "./Slide.styles";

import type { SlideOptions } from "./data";

type Props = {|
  ...$Exact<SlideOptions>,
  translateX: any
|};

class Slide extends Component<Props> {
  render() {
    const { props } = this;
    const animatedImageStyle = {
      transform: [{ translateX: props.translateX }]
    };

    return (
      <View style={styles.container}>
        <Animated.Image
          source={props.imageSource}
          style={[styles.image, animatedImageStyle]}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Slide;
