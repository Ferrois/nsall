import {
  Box,
  Button,
  HStack,
  Text,
  TextArea,
  Toast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function LeavesPage() {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const [reason, setReason] = useState("");
  const showMode = () => {
    setShow(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
  };
  const handleLeave = () => {
    if (date == null)
      return sendToast({
        title: "Error!",
        desc: "Please set a date",
        stat: "F",
      });
    if (reason == "")
      return sendToast({
        title: "Error!",
        desc: "Please state a reason",
        stat: "F",
      });
    const submitDate = date - 0;
    socket.emit("submitted", {
      date: submitDate,
      reason,
      id: store.userInfo.id,
    });
  };
  const sendToast = ({ title, desc, stat }) => {
    Toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

  useEffect(() => {
    socket.on("submitted-return", ({ status_, userInfo }) => {
      if (status_ == "S") {
        sendToast({
          title: "Success :>",
          desc: "Application submitted! It will be reviewed by someone. You may be contacted during this period",
          stat: "S",
        });
        setStore({ ...store, userInfo:userInfo });
        setReason("")
      }
      if (status_ == "F") {
        sendToast({
          title: "Failure :<",
          desc: "Application not submitted!",
          stat: "F",
        });
      }
    });
    return () => {
      socket.off("submitted-return");
    };
  }, []);
  return (
    <Box safeArea w="100%" alignItems="center">
      <HStack w="80%" alignItems="center" justifyContent={"space-between"}>
        <Button
          onPress={() => {
            showMode();
          }}
          bg={"primary.600"}
        >
          <Text style={styles.text1}>Set Date</Text>
        </Button>
        <Text style={styles.date}>
          {" "}
          {date ? date.toDateString() : "No date selected"}
        </Text>
      </HStack>
      {show && (
        <DateTimePicker
          minimumDate={new Date()}
          style={styles.datePicker}
          value={new Date()}
          onChange={onChange}
        />
      )}
      <Text
        color={"muted.600"}
        mt={"8"}
        fontSize={"2xl"}
        fontWeight={"bold"}
      >
        Reason for application
      </Text>
      <TextArea
        onChangeText={(value) => {
          setReason(value);
        }}
        value={reason}
        h={32}
        bg={"blueGray.200"}
        placeholder="Reason"
        w="80%"
        maxW="300"
      />
          <Text color={"muted.400"} mx={"2"}>Disclaimer: I pledge that the information I am giving is true. Any false information or exploitation of this system will lead to consequences by NS Authorities.</Text>
      <Button
        onPress={() => {
          handleLeave();
        }}
        bg={"success.700"}
        mt={"3"}
      >
        <Text style={styles.text1}>Submit</Text>
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  date: { fontWeight: "bold", fontSize: 16 },

  datePicker: {
    height: 30,
  },
});
