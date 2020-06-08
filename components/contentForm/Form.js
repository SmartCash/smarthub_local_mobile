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

  function Form({ address, balance, privateKey, withdraw }){
    const { isShowing, toggle } = useModal(false);
    const [txid, setTxId] = useState();
    const [fee, setFee] = useState();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    const {
      register,
      handleSubmit,
      errors,
      setError,
      setValue,
      formState,
      triggerValidation,
      getValues,
    } = useForm({ mode: "onChange", defaultValues: {
        amount: withdraw ? Number(balance - 0.002).toFixed(4) : null
      } });

  const [amount, setAmount] = useState();

  function ErrorAddress (){
    return(
      <View>
        {errors.address && (
          <Text className="error-message" style={styles.msgError}>{errors.address.message}</Text> 
        )}
      </View>
    );
  }

/*
    React.useEffect(() => { 
      register({ name: 'address'}, { required: true });
      register({ name: 'amount'}, { required: true });
      register({ name: 'privateKey'}, { required: true });
    }, [register]);
    */
   
    const onSubmit = (data) => {
      setLoading(true);
      createAndSendRawTransaction(
        data?.addressTo,
        Number(data?.amount),
        String(privateKey || data?.privateKey)
      )
        .then((data) => setTxId(data?.txid))
        .catch((error) => setError(error[0]?.message))
        .finally(() => setLoading(false));
    };
  console.log(setValue)
  
    const getFeeFromSAPI = (amount) => {
      console.log(address)
      getFee(Number(amount), address)
      
      .then((fee) => {
        setFee(fee);
        console.log(fee)
        if (fee && Number(getValues("amount")) + fee > balance) {
          setError("amount", "invalid", "Requested amount exceeds balance");
        }
      });
    };
    
    const [isValid, setIsValid] = useState(false);
    const [addressTo, setAddressTo] = useState('');

    const AddressTrue = async (value) => {
      setIsValid(false);
      let isValid = false;
      console.log("entrou na isaddres")
      const valueRight = value.nativeEvent.text;

      await isAddress(valueRight)
      .then(data => {
        console.log('entrou .then')
        setAddressTo(data);
        isValid = true;
        setIsValid(true);
      })
      .catch(data => data);
        console.log('falseAddress')
    if (isValid === false) {
      setError("address", "invalid", "Invalid Address");
    }
    console.log(isValid)
    return isValid;
    }

    const amountTrue = (value) => {
      let amount = value.nativeEvent.text
      
        if (amount > balance) {
          setError("amount", "invalid", "Exceeds balance");
          return false;
        }
        if (amount < 0.001) {
          setError(
            "amount",
            "invalid",
            "The minimum amount to send is 0.001"
          );
          return false;
        }
        if (
          !amount.match(
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
    }

    const  isppK = async (value) => {
      const valueRight = value.nativeEvent.text;
        let isValid = false;
        await isPK(valueRight)
          .then((data) => (isValid = true))
          .catch((error) => {
          setError("privateKey", "invalid", "Invalid Private Key");
      });
    }
//https://sapi2.smartcash.org/v1/address/balance/STwPMFh4VRXS5asoxFFdk2hMezHu6WUiEP
//lodash

const values = getValues("amount");
console.log(values)
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

          <TextInput style={styles.text}
            value={addressTo}
            onChangeText={text => setAddressTo(text)}
            autoComplete="off"
            ref={register({
              required: true,
              validate: isAddress,
            })}  
            onChange={AddressTrue}
            placeholder="________________________________________________">

          </TextInput>
            
        </View> 
          
        {isValid ? null : <ErrorAddress/>}

        <View style={styles.card}>

          <View style={styles.amount}>
            <Text>Amount to Send:</Text>
            <TextInput style={styles.amount} style={styles.amountWidth}
              keyboardType = 'numeric'
              onChangeText={Number =>setValue("amount",true, Number)}
              ref={register({
                required: true,
                validate: amountTrue
              })}
              onChange={async (e) => {
                const amount = value.nativeEvent.Number;
                await triggerValidation(amount)
                .then(
                  (data) => data && getFeeFromSAPI(value.nativeEvent.text)
                );
              }}
              placeholder="__________">
            </TextInput>
          </View>
          {isValid ?  (
            <View style={styles.text}>
              <Text>Fee: {fee} </Text> 
              <Text>Amount with fee: {Number(getValues("amount"))+ fee }</Text>
            </View>
          ): null}
         
          
        </View>
        
        {errors.amount && (
          <Text className="error-message">{errors.amount.message}</Text>
        )}

        {!privateKey ?(
        //card private Key
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
                validate:isppK 
                    
              })
            }
              placeholder="________________________________________________">
              
          </TextInput>
        
            {errors.privateKey && (
              <Text className="error-message">{errors.privateKey.message}</Text>
            )}

          </View>
      
        ) : null}  

        <View>
          <TouchableHighlight onPress={()=>{}}>
            <Button title="Send" disabled={loading || !formState.isValid}></Button>
          </TouchableHighlight>
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
    },  
    msgError:{
      color:"#ff1111",
      marginTop:-10,
      marginBottom:-10
    }
  });
  