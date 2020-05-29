import * as React from 'react';
import { StyleSheet, View, Button, Platform, StatusBar } from 'react-native';
import { ScrollView,  } from 'react-native-gesture-handler';
import Send from '../components/contentForm/Send';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <View style={styles.welcomeContainer}>
          <Send/>
        </View>

      </ScrollView>
    </View>
  );
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
