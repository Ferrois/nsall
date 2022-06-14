import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  Toast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function SettingsPage() {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  const sendToast = ({ title, desc, stat }) => {
    Toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
  };

  const handleSave = () => {
    if (date == null)
      return sendToast({
        title: "Error!",
        desc: "Please set a date",
        stat: "F",
      });
    const savedDate = date - 0;
    socket.emit("set-adtime", { id: store.userInfo.id, adtime: savedDate });
  };

  useEffect(() => {
    socket.on("set-adtime-return", ({ status_, userInfo }) => {
      if (status_ == "S") {
        sendToast({
          title: "Success!",
          desc: "Your admission time has been updated",
          stat: "S",
        });
        setStore({ ...store, userInfo });
      } else {
        sendToast({
          title: "Failure!",
          desc: "Your admission time has not been updated",
          stat: "F",
        });
      }
    });
    return () => {
      socket.off("set-adtime-return");
    };
  }, []);

  return (
    <Box flex={1} safeArea mt={"32"}>
      <Center>
        <Text mt={4} color={"muted.500"} w={"3/4"}>
          Pick the time at which you got admitted to NS{" "}
          {"(for countdown to ORD)"}
        </Text>
        <HStack>
          <Button
            onPress={() => {
              setShow(true);
            }}
          >
            Set Admission Date
          </Button>
          <Button bg={"success.600"} ml={2} onPress={() => handleSave()}>
            Save
          </Button>
        </HStack>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Date : {date ? date.toDateString() : "No Date Set"}
        </Text>
      </Center>
      {show && (
        <DateTimePicker
          value={new Date()}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </Box>
  );
}
