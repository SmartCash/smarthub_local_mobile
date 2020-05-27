import React, { useState } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from './Modal';

import { useForm } from "react-hook-form";
import { createAndSendRawTransaction, getFee } from "../lib/sapi";
import { isAddress, isPK } from "../lib/smart";
import useModal from "../util/useModal";
import barcode from "../assets/images/barcode.svg";
import { WebView, Linking } from 'react-native-webview';


function ShowSend({  balance, privateKey }){
  const { register, setValue, handleSubmit, errors } = useForm();
  const onSubmit = data => Alert.alert('Form Data', data);

  React.useEffect(() => { 
    register({ name: 'address'}, { required: true });
    register({ name: 'amount'}, { required: true });
    register({ name: 'privateKey'}, { required: true });
    
  }, [register]);
  return(
    <View>

      <View style={styles.contentCard}>

        <View style={styles.adress}>
          <Text>Adress to Send</Text>
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

      <View style={styles.contentCard}>
        <Text>Amount to Send</Text>
        <TextInput style={styles.text}
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
          placeholder="________________________________________________">
        </TextInput>
        
        {errors.amount && (
          <Text className="error-message">{errors.amount.message}</Text>
        )}
      </View>
      {fee && (
          <View style={styles.text}>
            <Text>Fee: {fee}</Text>
            <Text>Amount with fee: {Number(getValues("amount")) + fee}</Text>
          </View>
        )}

      {
        !privateKey ? (
      <View style={styles.contentCard}>

        <View style={styles.adress}>
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
        )
        : null
      }
      <View style={styles.Button}>
        <Button title={'Send'} 
         disabled={loading || !formState.isValid}
          onPress={() => {
            handleSubmit();
        }} />
      </View>
      {errors.privateKey && (
        <Text className="error-message">{errors.privateKey.message}</Text>
        )}

    </View>
  );
}
function ShowBalance (){
  return(
    <Text>Your Balance: </Text>
  );
}
function ShowTransactions(){
  return(
    <Text style={styles.Transactions}>Show Transactions </Text>
  );
}

export default function SendForm({ address, balance, privateKey, withdraw }) {
    const { isShowing, toggle } = useModal(false);
    const [txid, setTxId] = useState();
    const [fee, setFee] = useState();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    const url =`https://insight.smartcash.cc/tx/${txid}`;

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

      React.useEffect(() => { 
        register({ name: 'addressOrPrivateKey'}, { required: true });     
      }, [register]);

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
    
      const getFeeFromSAPI = (amount) => {
        getFee(Number(amount), address).then((fee) => {
          setFee(fee);
          if (fee && Number(getValues("amount")) + fee > balance) {
            setError("amount", "invalid", "Requested amount exceeds balance");
          }
        });
      };

      if (setTxId) {
        return (
          <View >
            <Text>Amount has been sent</Text>
            <WebView
                ref={(ref) => { webview = ref; }}
                source={{ url }}
                onNavigationStateChange={(event) => {
                  if (event.url !== url) {
                  this.webview.stopLoading();
                  Linking.openURL(event.url);
                  }}
                }>
              {txid}
              <Text>(click to view details)</Text>
              </WebView>
            <Button title="Refress"onClick={() => {}}>Refresh Page</Button>
          </View>
        );
      }

   return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formGroup"
        autoComplete="off"
      >

    <KeyboardAvoidingView behavior='position'>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.adress}>
            <Text style={styles.adress}>Your Address or Private Key</Text>
              
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
                onChangeText={text => setValue('addressOrPrivateKey', text, true)}
                autoComplete="off"
                ref={register({
                  required: true,
                  //validate: AddressPKValidation,
                  })}
                  onInput={() => triggerValidation("addressTo")}
              placeholder="________________________________________________">
               
            </TextInput>
        </View>
        
        <View>

          <View style={styles.ShowContent}>
            
            <ShowBalance/>

            <TouchableHighlight onPress={() => {}}>
              <ShowTransactions/>
            </TouchableHighlight>
           
          </View>
          
          <View style={styles.contentCard} style={styles.card } >
            <ShowSend/> 
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
    </form>
    </>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
    },
    ShowContent:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding:5
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
        justifyContent: 'space-between'
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
  