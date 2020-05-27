import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import useForm from 'react-hook-form';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default () => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const onSubmit = data => Alert.alert('Form Data', data);
  
  React.useEffect(() => {
    register({ name: 'firstName'}, { required: true });
    register({ name: 'lastName'});
  }, [register])

  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('firstName', text, true)}
      />
      <Text style={styles.label}>Last name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('lastName', text)}
      />

      <View style={styles.button}>
        <Button color="white" title="Button" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0
  },
  button :{
    marginTop: 40,
    color: 'white',
    backgroundColor: '#ec5990',
    height: 40,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  }
});
