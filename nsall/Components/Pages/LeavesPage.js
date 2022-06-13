import { Box, Button, Center, Text, TextArea } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function LeavesPage() {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
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
      <Text style={styles.text}>Leave Reason</Text>
      <TextArea
        onChangeText={(value) => {
          setDate(value);
        }}
        h={50}
        placeholder="dd/mm/yy"
        w="80%"
        maxW="300"
      />
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
});
