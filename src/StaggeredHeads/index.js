// @flow
import React, { Component } from "react";
import { Animated, View, PanResponder, Image } from "react-native";

import styles from "./styles";
import type AnimatedValueXY from "AnimatedValueXY";

const imageSource = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56091781-c1831780-5ebb-11e9-816b-0184e95099e1.png"
};

Image.prefetch(imageSource.uri);

const cloneCount: number = 3;

class App extends Component<Props> {
  _heads: Array<{ animation: AnimatedValueXY }> = [
    ...new Array(cloneCount + 1)
  ].map(() => ({
    animation: new Animated.ValueXY({ x: 0, y: 0 })
  }));

  _pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this._heads.map(({ animation }) => {
        animation.extractOffset();
        animation.setValue({ x: 0, y: 0 });
      });
    },
    onPanResponderMove: (_, { dx, dy }) => {
      const toValue = { x: dx, y: dy };
      const mainHeadImage = this._heads[this._heads.length - 1];

      mainHeadImage.animation.setValue(toValue);
      this._heads
        .slice(0, -1)
        .reverse()
        .map(({ animation }, index) => {
          Animated.sequence([
            Animated.delay(25 * index),
            Animated.spring(animation, { toValue, speed: 25 })
          ]).start();
        });
    }
  });

  render() {
    return (
      <View style={styles.container}>
        {this._heads.map(({ animation }, index, { length }) => {
          const isMainHeadImage = index === length - 1;

          return (
            <Animated.Image
              key={index}
              source={imageSource}
              style={[
                styles.image,
                {
                  transform: animation.getTranslateTransform()
                }
              ]}
              {...(isMainHeadImage ? this._pan.panHandlers : {})}
            />
          );
        })}
      </View>
    );
  }
}

export default App;
