import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Styles from "./styles";


function Balance({ balance, address }) {
  return (
    <View >
      <View style={Styles.balance}>
        <View style={Styles.button}>
          <Text style={Styles.textBalance} >Your Balance:{balance}</Text>
        </View>

        <View style={Styles.button}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://insight.smartcash.cc/address/${address}`)
            }
          >
            <Text style={Styles.textTransactions}>Show Transactions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Balance;
