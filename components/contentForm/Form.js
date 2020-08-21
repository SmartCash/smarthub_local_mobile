import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import {
  createAndSendRawTransaction,
  getFee,
  isAddress,
  isPK,
} from "../../lib/sapi";
import Styles from "./styles";
import ComponentModal from "../contentComponents/Modal";
import ErrorAddress from "./showErros/ErrorAddress";
import ErrorAmount from "./showErros/ErrorAmount";
import ErrorPvk from "./showErros/ErrorPvk";
import ShowInsight from "./ShowInsight";

function Form({ address, balance, privateKey, withdraw }) {
  const [txid, setTxId] = useState();
  const [txidTrue, setTxidTrue] = useState(false);
  const [fee, setFee] = useState();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidPvk, setIsValidPvk] = useState(privateKey ? true : false);
  const [amount, setAmount] = useState();
  const [pvk, setPvk] = useState(privateKey);
  const [addressTo, setAddressTo] = useState("");
  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
    clearError,
    formState,
    triggerValidation,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: withdraw ? Number(balance - 0.002).toFixed(4) : null,
    },
  });

  const getFeeFromSAPI = async (amount) => {
    await getFee(parseFloat(amount), address).then((fee) => {
      setFee(fee);
      let somafee = parseFloat(amount) + parseFloat(fee);

      if (somafee > parseFloat(balance)) {
        setError("amount", "invalid", "Requested amount exceeds balance");
      }
    });
  };

  const addressTrue = async (value) => {
    setIsValid(false);
    let isValid = false;
    const valueRight = value.nativeEvent.text;

    await isAddress(valueRight)
      .then((data) => {
        setAddressTo(data);
        isValid = true;
        setIsValid(true);
      })
      .catch((data) => data);

    if (isValid === false) {
      setError("address", "invalid", "Invalid Address");
    }

    return isValid;
  };
  const amountTrue = (value) => {
    let amount = parseFloat(value.nativeEvent.text).toFixed(8);
    balance = parseFloat(balance).toFixed(8);
    if (amount > balance) {
      setError("amount", "invalid", "Exceeds balance");
      return false;
    }
    if (amount < 0.001) {
      setError("amount", "invalid", "The minimum amount to send is 0.001");
      return false;
    }
    if (!amount.match(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:((\.)\d{0,8})+)?$/)) {
      setError("amount", "invalid", "Invalid format. e.g. 0,000.00000000");
      return false;
    }
    return clearError("amount");
  };

  const pvkTrue = async (value) => {
    setIsValidPvk(false);
    let isValid = false;
    const valueRight = value.nativeEvent.text;

    await isPK(valueRight)
      .then(() => {
        setPvk(valueRight);
        isValid = true;
        setIsValidPvk(true);
      })
      .catch((data) => data);

    if (isValid === false) {
      setError("privateKey", "invalid", "Invalid privateKey");
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    await createAndSendRawTransaction(
      String(addressTo),
      parseFloat(amount),
      String(pvk)
    )
      .then((data) => setTxId(data?.txid), setTxidTrue(true))
      .catch((error) => setError(error[0]?.message))
      .finally(
        () => setLoading(false),
        setIsValidPvk(false),
        setPvk(""),
        setAddressTo(""),
      );
  };

  return (
    <View>
      <View style={Styles.card} /*card address */>
        <View style={Styles.address}>
          <Text>Address to Send</Text>
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
          style={Styles.text}
          value={addressTo}
          onChangeText={(text) => setAddressTo(text)}
          autoComplete="off"
          ref={register({
            required: true,
            validate: isAddress,
          })}
          onChange={addressTrue}
          placeholder="________________________________________________"
        ></TextInput>

        <View style={Styles.marginError}>
          {!isValid ? <ErrorAddress errors={errors} /> : null}
        </View>
      </View>

      <View style={Styles.card} /*card amount */>
        <View style={Styles.amount}>
          <Text>Amount to Send:</Text>
          <TextInput
            style={Styles.amount}
            style={Styles.amountWidth}
            keyboardType={
              Platform.OS == "android" ? "numeric" : "numbers-and-punctuation"
            }
            onChangeText={(text) => setAmount(text)}
            ref={register({
              required: true,
              validate: getFeeFromSAPI(amount),
            })}
            onChange={amountTrue}
            placeholder="__________"
          ></TextInput>
        </View>

        {isValid ? (
          <View style={Styles.text}>
            <Text>Fee: {fee} </Text>
            <Text>
              Amount with fee: {Number(parseFloat(amount) + parseFloat(fee))}
            </Text>
            <ErrorAmount errors={errors} />
          </View>
        ) : null}
      </View>

      {!isValidPvk ? (
        //card private Key
        <View style={Styles.card}>
          <View style={Styles.address}>
            <Text>Your private Key</Text>
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
            style={Styles.text}
            value={pvk}
            onChangeText={(text) => setPvk(text)}
            ref={register({
              required: true,
              validate: isPK,
            })}
            onChange={pvkTrue}
            placeholder="________________________________________________"
          ></TextInput>

          <View style={Styles.marginError}>
            {isValidPvk ? null : <ErrorPvk errors={errors} />}
          </View>
        </View>
      ) : null}

      <View style={Styles.buttonSend} style={styles.button}>
        <TouchableHighlight>
          <Button
            title="Send"
            disabled={loading || !isValidPvk}
            onPress={() => onSubmit()}
          />
        </TouchableHighlight>
      </View>
      {txid ? <ShowInsight txid={txid} a={true} /> : null}
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
