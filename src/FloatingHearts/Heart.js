// @flow
import React from "react";
import { Animated } from "react-native";

import styles from "./Heart.styles";

const Heart = ({ style }: {| style: {} |}) => (
  <Animated.View style={[styles.container, style]} />
);

export default Heart;
