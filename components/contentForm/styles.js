import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  card: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    shadowColor: "#f4b517",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    backgroundColor: "#fff",
    padding: 10,
    elevation:5
  },
  contentCard: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor:Platform.OS ==="ios" ? "#f4b517" : "#f1f1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    width: 325,
    elevation:3
  },
  input: {
    padding: 10,
    color: "rgba(0,0,0,0.6)",
    fontSize: 15,
    lineHeight: 20,
  },
  adress: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qr: {
    backgroundColor: "#fff",
    marginRight: 10,
  },
  text: {
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    padding: 5,
    color: "rgba(0,0,0,0.6)",
    fontSize: 15,
    lineHeight: 20,
  },
  textBalance: {
    shadowRadius: 5,
    padding: 5,
    backgroundColor: "#f1f1f1"
  },
  textTransactions:{
    shadowColor: "#f4b517",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 0.2,
    padding: 5
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginVertical:5,
  },
  buttonSend:{
    alignContent:"space-around",
    elevation:5,
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginBottom: -15,
  },
  msgError: {
    color: "#ff1111",
    marginTop: -10,
    marginBottom: -10,
  },
  marginError: {
    marginTop: 10,
  },
  Balance: {
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 5,
  },
  address: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fee:{
    alignContent:"center"
  },
  amount: {
    flexDirection: "row",
    alignContent: "flex-end",
  },
  amountWidth: {
    justifyContent: "space-between",
    width: 100,
    alignItems: "center",
    alignContent: "flex-end",
    flexDirection: "row",
    marginLeft: 50,
  },
  qr: {
    backgroundColor: "#fff",
  },
  Button: {
    borderRadius: 50,
  },
});
