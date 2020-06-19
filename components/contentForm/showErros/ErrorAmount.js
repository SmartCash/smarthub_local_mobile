import React from "react";
import { View, Text, StyleSheet} from "react-native";


 export default function ErrorAmount({errors}) {
    return (
      <View>
        {errors.amount && (
          <Text className="error-message" style={styles.msgError}>
            {errors.amount.message}
          </Text>
        )}
      </View>
    );
  }
  const styles = StyleSheet.create({
    msgError:{
      marginTop:5,
      color:"#f00"
    }
  });

