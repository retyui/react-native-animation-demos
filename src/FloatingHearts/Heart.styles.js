// @flow
import { StyleSheet } from "react-native";

const HEART_SIZE = 50;

export const HEART_WIDTH = HEART_SIZE;
export const HEART_HEIGHT = HEART_SIZE;

const styles = StyleSheet.create({
  container: {
    width: HEART_WIDTH,
    height: HEART_HEIGHT,
    backgroundColor: "#fc2e5a"
  }
});

export default styles;
