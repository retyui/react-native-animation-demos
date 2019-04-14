// @flow
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  box: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "pink",
    width: 200,
    height: 200,
    position: "absolute",
    top: 0,
    left: 0
  }
});

export default styles;
