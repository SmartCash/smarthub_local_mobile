import { StyleSheet, View, Image } from 'react-native';
import React from "react";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={
          __DEV__
            ? require('../assets/images/logo.png')
            : require('../assets/images/logo.png')
            } style={styles.header}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    resizeMode: 'contain',
    marginTop:10,
    marginLeft: 15, 
    alignContent: 'space-around'
  },
  container:{
    backgroundColor:'#f1f1f1',
  }
});

