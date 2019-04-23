// @flow
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e22d4b"
  },
  progressBar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "#fff",
    height: 15
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonText: {
    marginBottom: 30,
    fontSize: 24,
    color: "#fff"
  },
  yesButton: {},
  noButton: {
    backgroundColor: "#ffffff15"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  questionText: {
    fontSize: 20,
    color: "#fff",
    position: "absolute",
    textAlign: "center"
  }
});

export default styles;
