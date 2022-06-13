<<<<<<< HEAD
import { Box, Button, Center, Text, TextArea, useToast } from "native-base";
=======
import { Box, Button, Center, HStack, Text, TextArea } from "native-base";
>>>>>>> d6375f7b090de1113a52a350cfae46ca6be71b7b
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function LeavesPage() {
  const toast = useToast();
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
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
          title: "Success :>",
          desc: "Application submitted!",
          stat: "S",
        });
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
      <HStack w="80%" alignItems="center">
        <Button
          onPress={() => {
            showMode();
          }}
          bg={"primary.400"}
          h={"10"}
          w={"30%"}
          mt={"2"}
        >
          <Text  style={styles.text1}>
            Set Date
          </Text>
        </Button>
        <Text style={styles.date}> {JSON.stringify(date)}</Text>
      </HStack>
      {show && (
        <DateTimePicker
          style={styles.datePicker}
          value={new Date()}
          onChange={onChange}
        />
      )}
      <Text style={styles.text2}>Leave Reason</Text>
      <TextArea
        onChangeText={(value) => {
          setReason(value);
        }}
        h={20}
        mt={"5"}
        
        placeholder="Reason"
        w="80%"
        maxW="300"
      />
      <Button
        onPress={() => {
          handleLeave();
        }}
        mt={"5"}
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
    color:"white"
  },
  date:{fontWeight: "bold",
  fontSize: 16},
  text2: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    
  },
  datePicker: {
    height: 30,
  },
});
