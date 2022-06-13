import { Box, Button, Center, Text, TextArea } from "native-base";
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
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const showMode = (currentMode) => {
    setShow(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
  };
  const handleLeave = () => {
    socket.emit("submitted", { date, reason, id: store.userInfo.id });
  };
  const sendToast = ({ title, desc, stat }) => {
    toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

  useEffect(() => {
    socket.on("submitted-return", ({ status_ }) => {
      if (status_ == "S") {
        sendToast({
          title: "Success:>",
          desc: "Application submitted!",
          stat: "S",
        });
      }
      if (status_ == "F") {
        sendToast({
          title: "Failure:<",
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
    <Box safeArea alignItems="center" w="100%">
      <Button
        onPress={() => {
          showMode();
        }}
      >
        Set Date
      </Button>
      {show && (
            <DateTimePicker style={styles.datePicker} value={new Date()} onChange={onChange}/>)

      }
      <Text> {JSON.stringify(date)}</Text>
      <Text style={styles.text}>Leave Reason</Text>
      <TextArea
        onChangeText={(value) => {
          setReason(value);
        }}
        h={20}
        placeholder="Reason"
        w="80%"
        maxW="300"
      />
      <Button
        onPress={() => {
          handleLeave();
        }}
      ></Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  datePicker: {
    height: 30,
  },
});
