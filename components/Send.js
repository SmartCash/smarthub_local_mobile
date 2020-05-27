import React, { useState } from "react";
import SendForm from "./SendForm";
import {getBalance, getAddress, createNewWalletKeyPair} from "../lib/sapi";
import { isAddress, isPK } from "../lib/smart";
import { useForm } from "react-hook-form";
import useModal from "../util/useModal";
import Modal from "./Modal";
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { WebView, Linking } from 'react-native';

function Send() {
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
  const url = `https://insight.smartcash.cc/address/${address}`;
  return (
    <View style={styles.container}>
      <View>
        <View >
          <View style={styles.card} >
    
            <View style={styles.adress}>
              
              <TextInput
                style={styles.text}
                placeholder="Your Address or PrivateKey"
                  title="text"
                  onChangeText={text => setValue('address', text, true)}
                  autoComplete="off"
                  ref={register({
                    required: true,
                    validate: AddressPKValidation,
                  })}
                onInput={() => triggerValidation("addressTo")}
              />
              <Modal
                isShowing={isShowing}
                hide={toggle}
                callback={(obj) =>
                  obj.address && setValue("address", obj.address, true)
                }
              /> 
              </View>

              {errors.address && (
                <Text className="error-message">{errors.address.message}</Text>
              )}
                        
          </View>
        </View>
      </View>

        {formState.isValid ? (
         
          <View>
            <View >
              <View>
                <Text>Your Balance: {balance}</Text>
                
              </View>
            </View>

            <View style={styles.container}>
              <View >
                
              </View>
            </View>

          </View>
        ) : null}
        
    </View>
  
  );
}
export default Send;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  ShowContent:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:5,
  },
  Transactions:{
    backgroundColor:'#f1f1f1',
    shadowOffset: { width: -1, height:5} ,
    shadowOpacity: 0.09,
    padding:10,
    marginTop:-10
  },
  text: {
    padding: 10,
    color: 'rgba(0,0,0,0.6)',
    fontSize: 15,
    lineHeight:20,
  },
  Balance:{
    marginLeft:10,
    marginTop:1,
    marginBottom:5
  },
  adress: {
      marginTop:'2%',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },  
  qr: {
    backgroundColor: '#fff'
  },
  Button:{
    borderRadius: 50,
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
    padding:20,
  },
  contentCard:{
    marginBottom: 20,
    backgroundColor:'#fff',
    padding:10,
    shadowColor: 'black',
    shadowOffset: { width: -1, height: 10},
    shadowOpacity: 0.09,
  }
});

