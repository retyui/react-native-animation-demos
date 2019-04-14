// @flow
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    resizeMode: "stretch",
    width: 32 * 3,
    height: 32 * 3,
    position: "absolute"
  }
});

export default styles;
