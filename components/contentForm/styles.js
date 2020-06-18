import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
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
  card: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  contentCard: {
    marginBottom: 20,
    backgroundColor: "#f1f1f2",
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 10 },
    shadowOpacity: 0.09,
    width: 325,
  },
  text: {
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    padding: 5,
    backgroundColor: "#f1f1f1",
  },
  textBalance: {
    shadowRadius: 5,
    padding: 5,
    backgroundColor: "#f1f1f2",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginTop: -15,
    marginBottom: -10,
  },
  msgError: {
    color: "#ff1111",
    marginTop: -10,
    marginBottom: -10,
  },
  marginError: {
    marginTop: 10,
  },
  text: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 15,
    lineHeight: 20,
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
