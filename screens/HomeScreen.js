import * as React from "react";
import {
  StyleSheet,
  View,
  Button,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Send from "../components/contentForm/Send";

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "android" ? "height" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}

        <View style={styles.welcomeContainer}>
          <Send />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
