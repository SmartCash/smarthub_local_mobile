import React, { useState } from 'react';
import { StyleSheet,
  View,
  Button, 
  Linking,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput } from 'react-native';

import Modal from "../contentComponents/Modal";

import { isAddress,
  isPK,
  getBalance,
  getAddress,
  createNewWalletKeyPair } from '../../lib/sapi';
  import { useForm } from "react-hook-form";

  import Forme from '../contentForm/Form';

 function Send() {
  
  //address return true on input
  //needed to validate balance and privateKey
  //formsState return always true in object

  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState();
  const {register,
    errors,
    setError,
    setValue,
    formState,
    triggerValidation,} = useForm({mode: "onChange",});

  const [isValid, setIsValid] = useState(false);

  const getBalanceFromSAPI = (address) => {
    setBalance("Loading Balance");
    getBalance(address)
      .then((res) => setBalance(res.balance))
      .catch((error) => setBalance("Error"));
  }

  const AddressPKValidation = async (value) => {
    setIsValid(false);
    let isValid = false;
    const valueRight = value.nativeEvent.text;
    
    await isAddress(valueRight)
      .then(data => {
        setAddress(data);
        getBalanceFromSAPI(data);
        isValid = true;
        setIsValid(true);
      })
      .catch(data => data);

    await isPK(valueRight)
      .then(() => {
        const address = getAddress(valueRight);
        setAddress(address);
        setPrivateKey(valueRight);
        getBalanceFromSAPI(address);
        isValid = true;
      })
      .catch(data => data);
      
    if (isValid === false) {
      setError("address", "invalid", "Invalid Address");
    }
    return isValid;
  }

  function Balance(){
    return(
      <View style={styles.balance}>

        <View style={styles.button}>
          <Text style={styles.textBalance}>Your Balance:{balance}</Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity 
              onPress={ ()=> Linking.openURL(`https://insight.smartcash.cc/address/${address}`)}>
            <Text style={styles.text}>Show Transactions</Text>
          </TouchableOpacity>
        </View>

    </View>

    );
  } 

  function ErrorAddress(){
    return(
      <View style={styles.marginError}>
        {errors.address && (
          <Text className="error-message" style={styles.msgError}>{errors.address.message}</Text> 
        )}
      </View>
    );
  }

  return(
    <View style={styles.container}>

      <View style={styles.card}>

        <View style={styles.contentCard}>

          <View style={styles.adress}>
            <Text>Your Address or Private Key </Text>
            <TouchableHighlight
              onPress={() => {
              this.setModalVisible(!modalVisible);
              }}
            >
            <View style={styles.qr}>
              <Modal/>
            </View> 
          </TouchableHighlight>
          </View>

          <TextInput style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
            autoComplete="off"
            ref={register({
              required: true,
              validate: AddressPKValidation,
            })}
            //onInput={() => triggerValidation("addressTo")}
            onChange={AddressPKValidation}  
 
            placeholder="_________________________________________________">
          </TextInput>
          {isValid ? null : <ErrorAddress/> }
        </View>
          {isValid ? <Balance/> : null}
          {isValid ? <Forme address={address} balance={balance} privateKey={privateKey} /> : null}
      </View>
            
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
    width:325,
  },
  text:{
    shadowOffset: { width: -1, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 5,
    padding:5,
    backgroundColor:'#f1f1f1'
  },
  textBalance:{
    shadowRadius: 5,
    padding:5,
    backgroundColor:'#fff'
  },
  button:{
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  balance:{
    flexDirection: 'row',
    justifyContent:'space-around',
    flex:1,
    marginTop:-15,
    marginBottom:-10
  },  
  msgError:{
    color:"#ff1111",
    marginTop:-10,
    marginBottom:-10
  },
  marginError:{
    marginTop:10
  }
});

export default Send;