// @flow
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import styles from "./styles";

const { width } = Dimensions.get("window");

const questions = [
  "Do you like react-native?",
  "Is react-native feature?",
  "Is Facebook create react-native?",
  "Is Flow.js using by default?",
  "Do you use react-test-renderer?",
  "From your point of view, is Flutter better?"
];

const App = () => {
  const [look] = useState({ flag: false });
  const [animatedValue] = useState(new Animated.Value(0));
  const [animatedProgressValue] = useState(new Animated.Value(0));
  const [progress, updateProgress] = useState(0);

  const incrementProgress = () => {
    if (!look.flag && progress + 1 < questions.length) {
      const newProgress = progress + 1;

      look.flag = true;

      Animated.parallel([
        Animated.spring(animatedProgressValue, { toValue: newProgress }),
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true
        })
      ]).start(() => {
        look.flag = false;
        updateProgress(newProgress);
        animatedValue.setValue(0);
      });
    }
  };

  const progressInterpolate = animatedProgressValue.interpolate({
    inputRange: [0, questions.length - 1],
    outputRange: ["0%", "100%"]
  });
  const nextQuestionInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const currentQuestionInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width]
  });

  const nextQuestionStyle = { transform: [{ scale: nextQuestionInterpolate }] };
  const progressStyle = { width: progressInterpolate };
  const currentQuestionStyle = {
    transform: [{ translateX: currentQuestionInterpolate }]
  };

  const currentQuestion = questions[progress];
  const nextQuestion = questions[progress + 1];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, progressStyle]} />

      <View style={styles.overlay}>
        <Animated.Text style={[styles.questionText, nextQuestionStyle]}>
          {nextQuestion}
        </Animated.Text>

        <Animated.Text style={[styles.questionText, currentQuestionStyle]}>
          {currentQuestion}
        </Animated.Text>
      </View>

      <TouchableWithoutFeedback onPress={incrementProgress}>
        <View style={[styles.button, styles.yesButton]}>
          <Text style={styles.buttonText}>Yes</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={incrementProgress}>
        <View style={[styles.button, styles.noButton]}>
          <Text style={styles.buttonText}>No</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default App;
