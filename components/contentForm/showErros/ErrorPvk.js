import React from "react";
import { View, Text} from "react-native";
import Styles from "../styles";

 export default function ErrorPvk({errors}) {
  return (
    <View>
      {errors.privateKey && (
        <Text className="error-message" style={Styles.msgError}>
          {errors.privateKey.message}
        </Text>
      )}
    </View>
  );
}

