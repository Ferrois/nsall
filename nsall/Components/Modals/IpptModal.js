import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Select,
  Text,
  Toast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import isNumeric from "../../Helpers/isNumeric";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "./ToastMsg";

export default function IpptModal({ showModal, handleCloseModal }) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const [showDateTP, setShowDateTP] = useState("");
  const [date, setDate] = useState("");
  const [pushups, setPushups] = useState("");
  const [situps, setSitups] = useState("");
  const [run, setRun] = useState("");
  const sendToast = ({ title, desc, stat }) => {
    Toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };
  const handleSubmit = async () => {
    if (pushups == "" || isNumeric(pushups) == false)
      return sendToast({
        title: "Error!",
        desc: "You must input a numeric amount of pushups",
        stat: "F",
      });
    if (situps == "" || isNumeric(situps) == false)
      return sendToast({
        title: "Error!",
        desc: "You must input a numeric amount of situps",
        stat: "F",
      });
    if (run == "" || isNumeric(run) == false)
      return sendToast({
        title: "Error!",
        desc: "You must input a numeric amount of run timing in seconds",
        stat: "F",
      });
    const scores = await axios.get(`https://ippt.vercel.app/api?age=18&situps=${situps}&pushups=${pushups}&run=${run}`)
    socket.emit("addipptinfo", {
      id: store.userInfo.id,
      date,
      pushups,
      situps,
      run,
      score:scores.data.total,
    });
    setPushups("");
    setSitups("");
    setRun("");
  };

  useEffect(() => {
    socket.on("addipptinfo-return", ({ status_, userInfo }) => {
      if (status_ == "F")
        sendToast({
          title: "Server Error!",
          desc: "There was a problem with the server.",
          stat: "F",
        });
      if (status_ == "S") {
        sendToast({
          title: "Success!",
          desc: "You IPPT record has been updated.",
          stat: "S",
        });
        setStore({...store,userInfo})
      }
    });
    return () => socket.off("addipptinfo-return");
  }, []);

  return (
    <Modal isOpen={showModal} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add IPPT Record</Modal.Header>
        <Modal.Body>
          <HStack alignItems={"center"} justifyContent={"space-around"}>
            <Button
              onPress={() => {
                setShowDateTP(!showDateTP);
              }}
            >
              Set Date
            </Button>
            <Text fontWeight="bold">
              {date ? date.toDateString() : "No Date Set"}
            </Text>
          </HStack>
          {showDateTP && (
            <DateTimePicker
              maximumDate={new Date()}
              value={new Date()}
              onChange={(event, value) => {
                setShowDateTP(false);
                setDate(new Date(value));
              }}
            />
          )}
          <FormControl>
            <FormControl.Label>Pushups</FormControl.Label>
            <Input
              value={pushups}
              keyboardType={"numeric"}
              onChangeText={(value) => setPushups(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Situps</FormControl.Label>
            <Input
              value={situps}
              keyboardType={"numeric"}
              onChangeText={(value) => setSitups(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{"Run (In seconds)"}</FormControl.Label>
            <Input
              value={run}
              keyboardType={"numeric"}
              onChangeText={(value) => setRun(value)}
            />
          </FormControl>
          <Text color={"muted.400"}>
            Disclaimer: Please be honest, any false uploads of IPPT results may
            be monitored by NS Authorities.
          </Text>
          <Button onPress={handleSubmit} mt={2}>
            Submit
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
