import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import parking from "./data/parkingData.js";

import Entrance from "./components/Entrance";
export default function App() {
  const [isModal, setIsModal] = useState(false);
  const [time, setTime] = useState(1);
  const [totalAmount, setTotalAmount] = useState(40);
  const timerRef = useRef(time);

  // Declare attributes
  const plateNumber = "OOP 1234";
  const carSize = "LP";

  let parkingAmount = null;

  switch (carSize) {
    case "SP":
      parkingAmount = 20;
      break;
    case "MP":
      parkingAmount = 60;
      break;
    case "LP":
      parkingAmount = 100;
      break;
  }

  // Flatlist Items: Renders the parking slots
  // Item View for the Flatlist
  const Item = ({ title }) => (
    <View
      style={{
        padding: 10,
        width: 70,
        borderWidth: 1,
        margin: 3,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          title.item.occupied == false
            ? "white"
            : title.item.plate == "OOP 1234"
            ? "green"
            : "red",
      }}
    >
      <Text>{title.item.size}</Text>
      <Text style={{ fontSize: 10 }}>{title.item.plate}</Text>
    </View>
  );

  // Parking timer
  useEffect(() => {
    let timerId = null;
    if (isModal) {
      timerId = setInterval(() => {
        timerRef.current += 1;
        if (timerRef.current < 0) {
          clearInterval(timerId);
        } else {
          setTime(timerRef.current);
        }
      }, 100);
      return () => {
        clearInterval(timerId);
      };
    } else {
      clearInterval(timerId);
      timerRef.current =null;
      setTotalAmount(40)
    }
  }, [isModal]);

  useEffect(() => {
    if (time % 1440 == 0) {
      setTotalAmount(totalAmount + parkingAmount);
    }
    if (time % 60 == 0) {
      setTotalAmount(totalAmount + parkingAmount);
    }
  }, [time]);

  // Unpark Function
  const unpark = () => {
    const slot = parking.find((i) => i.plate == plateNumber);
    slot.plate = "";
    slot.occupied = false;
  };

  // Render screen
  return (
    <View style={styles.container}>
      <Entrance
        isModal={isModal}
        setIsModal={setIsModal}
        plateNumber={plateNumber}
        carSize={carSize}
      />

      <Modal visible={isModal}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <FlatList
              horizontal={false}
              numColumns={5}
              data={parking}
              renderItem={(item) => <Item title={item} />}
            />
          </View>
          <View>
            <Text>Amount to pay: Php {totalAmount}</Text>
          </View>
          <View>
            <Text>{time} mins</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "yellow",
              borderRadius: 25,
              marginBottom: 50,
            }}
            onPress={() => {
              unpark();
              setIsModal(!isModal);
            }}
          >
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
