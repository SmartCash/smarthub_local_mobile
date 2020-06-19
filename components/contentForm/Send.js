import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";

import ComponentModal from "../contentComponents/Modal";

import { isAddress, isPK, getBalance, getAddress } from "../../lib/sapi";
import { useForm } from "react-hook-form";

import Styles from "./styles";
import Balance from "./ShowBalance";
import Form from "../contentForm/Form";
import ErrorAddress from "./showErros/ErrorAddress";

function Send() {
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState();
  const [isValid, setIsValid] = useState(false);
  const {
    register,
    errors,
    setError,
    setValue,
    formState,
    triggerValidation,
  } = useForm({ mode: "onChange" });

  const getBalanceFromSAPI = (address) => {
    setBalance("Loading Balance");
    getBalance(address)
      .then((res) => setBalance(res.balance))
      .catch((error) => setBalance("Error"));
  };

  const AddressPKValidation = async (value) => {
    setIsValid(false);
    let isValid = false;
    const valueRight = value.nativeEvent.text;

    await isAddress(valueRight)
      .then((data) => {
        setAddress(data);
        getBalanceFromSAPI(data);
        isValid = true;
        setIsValid(true);
      })
      .catch((data) => data);

    await isPK(valueRight)
      .then(() => {
        const address = getAddress(valueRight);
        setAddress(address);
        setPrivateKey(valueRight);
        getBalanceFromSAPI(address);
        isValid = true;
      })
      .catch((data) => data);

    if (isValid === false) {
      setError("address", "invalid", "Invalid Address");
    }
    return isValid;
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.card}>
        <View style={Styles.contentCard}>
          <View style={Styles.adress}>
            <Text>Your Address or Private Key </Text>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={Styles.qr}>
                <ComponentModal />
              </View>
            </TouchableHighlight>
          </View>

          <TextInput
            style={Styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
            autoComplete="off"
            ref={register({
              required: true,
              validate: AddressPKValidation,
            })}
            onChange={AddressPKValidation}
            placeholder="_________________________________________________"
          ></TextInput>
          {isValid ? null : <ErrorAddress errors={errors} />}
        </View>
      </View>
      <View>
        {isValid ? <Balance balance={balance} address={address} /> : null}
        {isValid ? (
          <Form address={address} balance={balance} privateKey={privateKey} />
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
export default Send;
