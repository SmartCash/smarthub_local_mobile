import React, {useState} from 'react';
import { StyleSheet, View, Button, Platform, StatusBar,Text,TouchableHighlight, TextInput } from 'react-native';
import { isAddress, isPK } from '../lib/sapi';

 function SendRight() {
  
  var isAddressTrue = isAddress(`SMk5FaYYxKdwrTDThWhBN6oAq5jS72Bb7e`).then(data => data);

  return(

    <View style={styles.container}>
      <Text></Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  input: {
    padding: 10,
    color: 'rgba(0,0,0,0.6)',
    fontSize: 15,
    lineHeight:20,
  },
  adress: {
    marginTop:'2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
  qr: {
    backgroundColor: '#fff',
    marginRight:10
  },
  card: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 12,
    marginRight: 12,
    shadowColor: 'black',
    shadowOffset: { width: -1, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 5,
    backgroundColor:'#fff',
    padding:10,
  },
  contentCard:{
    marginBottom: 20,
    backgroundColor:'#fff',
    padding:10,
    shadowColor: 'black',
    shadowOffset: { width: -1, height: 10},
    shadowOpacity: 0.09,
    width:325

  },
  text:{
    marginLeft: 12,
    marginRight: 200,
    shadowColor: 'black',
    shadowOffset: { width: -1, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 5,
    backgroundColor:'#fff',
    padding:10,
  },
});
export default SendRight;