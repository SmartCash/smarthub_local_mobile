import React, { useState } from "react";
import { View, Text, Linking, Modal, StyleSheet, Button } from "react-native";
function ShowInsight({ txid, a }) {
  const [modalVisible, setModalVisible] = useState(a);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Amount has been sent</Text>
            <View style={styles.rowButton}>
              <Button
                title="click to view details"
                onPress={() => {
                  Linking.openURL(`https://insight.smartcash.cc/tx/${txid}`);
                }}
              />
              <Button
                title="Exit"
                onPress={() => {
                  setModalVisible(false);
                  //needed reload screen
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ShowInsight;
