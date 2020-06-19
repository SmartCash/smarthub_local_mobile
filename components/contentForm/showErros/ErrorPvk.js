import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorPvk({ errors }) {
  return (
    <View>
      {errors.privateKey && (
        <Text className="error-message" style={styles.msgError}>
          {errors.privateKey.message}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  msgError: {
    marginTop: 0,
    color: "#ff1111",
  },
});
