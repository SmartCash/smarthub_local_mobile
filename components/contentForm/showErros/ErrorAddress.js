import React from "react";
import { View, Text} from "react-native";
import Styles from "../styles";

 export default function ErrorAddress({errors}) {
  return (
    <View style={Styles.marginError}>
      {errors.address && (
        <Text className="error-message" style={Styles.msgError}>
          {errors.address.message}
        </Text>
      )}
    </View>
  );
}

