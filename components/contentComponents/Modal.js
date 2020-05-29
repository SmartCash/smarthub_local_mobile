import React, { Component, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View, 
  Image
} from "react-native";
import Cam from './Cam';

class App extends Component {
  constructor(props) {
    const isShowing ='';
    const hide = '';
    const callback ='';
    super(props);

    const handleScan = (data) => {
      if (data) {
        hide();
        const obj = {
          address: getQrCode(data),
          amount: getAmountFromQrCode(data),
        };
        callback(obj);
      }
    };
    const getQrCode = (content) => {
      var qrCode = content;
  
      if (qrCode.includes(":")) {
        qrCode = qrCode.substring(qrCode.indexOf(":") + 1);
      }
  
      if (qrCode.includes("?")) {
        qrCode = qrCode.substring(0, qrCode.indexOf("?"));
      }
  
      return qrCode;
    };
    const getAmountFromQrCode = (content) => {
      const results = new RegExp("[?&]amount=([^&#]*)").exec(content);
      return results?.length ? results[1] : null;
    };
    const handleError = (err) => {console.error(err);}
  }
  
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View>              
              <Cam/>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Image
            style={styles.qrcode}
            source={require('../../assets/images/qrcode.png')}
            />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrcode: {
    padding: 15,
    width: 30,
    height: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
