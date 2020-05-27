import React, {useState} from 'react';
import { StyleSheet, View, Button, Platform, StatusBar,Text,TouchableHighlight, TextInput } from 'react-native';
import { ScrollView,  } from 'react-native-gesture-handler';
import Modal from "./Modal";
import {getBalance, getAddress, createNewWalletKeyPair} from "../lib/sapi";
import { isAddress, isPK } from "../lib/smart";
import { useForm } from "react-hook-form";
import useModal from "../util/useModal";
import { WebView, Linking } from 'react-native';
import SendForm from './SendForm';

 function SendRight() {
  const url = `https://insight.smartcash.cc/address/${address}`;

  const { isShowing, toggle } = useModal(false);
  const [address, setAddress] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [balance, setBalance] = useState(false);
  const {
    register,
    errors,
    setError,
    setValue,
    formState,
    triggerValidation,
  } = useForm({
    mode: "onChange",
  });

  const getBalanceFromSAPI = (address) => {
    setBalance("Loading Balance");
    getBalance(address)
      .then((res) => setBalance(res.balance))
      .catch((error) => setBalance("Error loading balance"));
  };

  const AddressPKValidation = async (value) => {
    let isValid = false;

    await isAddress(value)
      .then(data => {
        setAddress(data);
        getBalanceFromSAPI(data);
        isValid = true;
      })
      .catch(data => data);

    await isPK(value)
      .then(() => {
        const address = getAddress(value);
        setAddress(address);
        setPrivateKey(value);
        getBalanceFromSAPI(address);
        isValid = true;
      })
      .catch(data => data);

    if (!isValid) {
      setError("address", "invalid", "Invalid Address");
    }

    return isValid;
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

          <TextInput 
            style={styles.input}
              onChangeText={text => setValue('address', text, true)}
              title="text"
              autoComplete="off"
              ref={register({
                required: true,
                validate: AddressPKValidation,
              })}
            onInput={() => triggerValidation("addressTo")}
            placeholder="_________________________________________________">
              
          </TextInput>
          {errors.address && (
            <Text className="error-message">{errors.address.message}</Text>
          )}
        </View>
      </View>
      <View>
        {formState.isValid ? (
        <View>
          <View >

            <View>
              <Text style={styles.text}>Your Balance: {balance}</Text>
                
            </View>
          </View>

            <View style={styles.container}>

              <View >
                <SendForm address={address} balance={balance} privateKey={privateKey}/>
              </View>

            </View>

          </View>
        ) : null}
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