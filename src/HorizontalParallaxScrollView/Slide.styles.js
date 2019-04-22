// @flow
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: "hidden"
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  },
  textWrap: {
    backgroundColor: "#00000075",
    paddingVertical: 20
  },
  title: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  }
});

export default styles;
