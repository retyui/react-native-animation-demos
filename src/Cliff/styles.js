// @flow
import { StyleSheet, Dimensions } from "react-native";

export const { height: ROOT_HEIGHT, width: ROOT_WIDTH } = Dimensions.get(
  "window"
);

export const BOX_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ROOT_HEIGHT
  },
  half: {
    flex: 1,
    height: ROOT_HEIGHT / 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  box: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: BOX_SIZE,
    height: BOX_SIZE,
    top: 0,
    left: 0
  }
});

export default styles;
