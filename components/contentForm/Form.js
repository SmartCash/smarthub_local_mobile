import React, { useState } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  WebView,
  Linking } from 'react-native';
  import Modal from "../contentComponents/Modal";
  import { createAndSendRawTransaction, getFee, isAddress, isPK } from "../../lib/sapi";
  import useModal from "../../util/useModal";
  import { useForm } from "react-hook-form";

  function Form({ balance, privateKey }){
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => Alert.alert('Form Data', data);

    React.useEffect(() => { 
      register({ name: 'address'}, { required: true });
      register({ name: 'amount'}, { required: true });
      register({ name: 'privateKey'}, { required: true });
      
    }, [register]);
    
      return(
      <View style={styles.container}>

        <View style={styles.card}>
          
          <View style={styles.address}> 
            <Text>Address to Send</Text>
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
            style={styles.text}
            onChangeText={text => setValue('address', text, true)}
            ref={register({
              required: true,
              validate: async (value) => {
                let isValid = false;
                await isAddress(value)
                  .then((data) => {
                    isValid = true;
                  })
                  .catch((error) => {
                    setError("addressTo", "invalid", "Invalid address");
                  });
                return isValid;
              },
            })}  
            onInput={() => triggerValidation("addressTo")}
            placeholder="________________________________________________">

          </TextInput>
            
        </View> 
        
        <View style={styles.card}>

          <View style={styles.amount}>
            <Text>Amount to Send:</Text>
            <TextInput style={styles.amount} style={styles.amountWidth}
              keyboardType = 'numeric'
              onChangeText={text => setValue('amount', text, true)}
              ref={register({
                required: true,
                validate: (value) => {
                  if (value > balance) {
                    setError("amount", "invalid", "Exceeds balance");
                    return false;
                  }
                  if (value < 0.001) {
                    setError(
                      "amount",
                      "invalid",
                      "The minimum amount to send is 0.001"
                    );
                    return false;
                  }
                  if (
                    !value.match(
                      /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:((\.)\d{0,8})+)?$/
                    )
                  ) {
                    setError(
                      "amount",
                      "invalid",
                      "Invalid format. e.g. 0,000.00000000"
                    );
                    return false;
                  }
                },
              })}
              onInput={async (e) => {
                const amount = e?.target?.value;
                await triggerValidation("amount").then(
                  (data) => data && getFeeFromSAPI(amount)
                );
              }}
              placeholder="__________">
            </TextInput>
          </View>
          <View style={styles.text}>
            <Text>Fee: put variable fee </Text> 
            <Text>Amount with fee: put Number getValues "amount" </Text>
          </View>
        
        </View>
        
        {errors.amount && (
          <Text className="error-message">{errors.amount.message}</Text>
        )}
        
        <View style={styles.card}>

          <View style={styles.address}>
            <Text>Your private Key</Text>
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
          style={styles.text}
          onChangeText={text => setValue('privateKey', text, true)}
          ref={register({
            required: true,
            validate: async (value) => {
              let isValid = false;
              await isPK(value)
                .then((data) => (isValid = true))
                .catch((error) => {
                  setError("privateKey", "invalid", "Invalid Private Key");
                });
              return isValid;
            },
          })}
          placeholder="________________________________________________">
        </TextInput>
       
        </View>

      </View>
    );
  }
  
  export default Form;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: 'rgba(0,0,0,0.6)',
      fontSize: 15,
      lineHeight:20,
    },
    Balance:{
      marginLeft:10,
      marginTop:1,
      marginBottom:5
    },
    address: {
      marginTop:'2%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },  
    amount:{
      flexDirection: 'row',
      alignContent:'flex-end',
    },
    amountWidth:{
      justifyContent:'space-between',
      width:100,
      alignItems:'center',
      alignContent:'flex-end',
      flexDirection: 'row',
      marginLeft:50

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
  