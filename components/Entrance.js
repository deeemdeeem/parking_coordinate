import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import FindSlot from "./FindSlot";
import parking from "../data/parkingData";

const Entrance = (props) => {
  return (
    <View>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Text>Welcome to Object-Oriented Parking</Text>
        <Text>Your Plate Number: {props.plateNumber}</Text>
        <Text>Vehicle Size: LP</Text>
      </View>
      <View style={{ flex: 4, flexDirection: "row" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6693F5",
            }}
            onPress={() => {
              if (
                parking.filter(
                  (i) => i.occupied == false && i.size == props.carSize
                ).length != 0
              ) {
                FindSlot("PE1", props.plateNumber, props.carSize);
                props.setIsModal(!props.isModal);
              }
            }}
          >
            <Text>PE 1</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LottieView
            style={{ width: 250, height: 250 }}
            source={require("../assets/car.json")}
            autoPlay
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6693F5",
            }}
            onPress={() => {
              if ( parking.filter(
                (i) => i.occupied == false && i.size == props.carSize
              ).length != 0) {
                FindSlot("PE3", props.plateNumber, props.carSize);
                props.setIsModal(!props.isModal);
              }
            }}
          >
            <Text>PE 3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ flex: 2, justifyContent: "flex-start", alignItems: "center" }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#6693F5",
          }}
          onPress={() => {
            if (
              parking.filter(
                (i) => i.occupied == false && i.size == props.carSize
              ).length != 0
            ) {
              FindSlot("PE2", props.plateNumber, props.carSize);
              props.setIsModal(!props.isModal);
            }
          }}
        >
          <Text>PE 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Entrance;
