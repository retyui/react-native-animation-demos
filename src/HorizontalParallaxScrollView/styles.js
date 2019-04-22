// @flow
import { StyleSheet } from "react-native";

export const BUTTON_SIZE = 70;
export const BUTTON_OFFSET = 20;

const baseBtnStyle = {
  position: "absolute",
  right: BUTTON_OFFSET,
  bottom: BUTTON_OFFSET,
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: BUTTON_SIZE / 2
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    ...baseBtnStyle,
    backgroundColor: "#00000035"
  },
  button: {
    ...baseBtnStyle,
    alignItems: "center",
    justifyContent: "center",

    // IOS
    elevation: 3,
    //Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 1 }
  },
  openButton: {
    backgroundColor: "gold"
  },
  buttonText: {
    color: "#fff"
  },
  subButton: {
    backgroundColor: "#fff"
  },
  subButtonText: {
    fontSize: 15
  },
  label: {
    fontSize: 18,
    color: "#fff",
    position: "absolute"
  }
});

export default styles;
