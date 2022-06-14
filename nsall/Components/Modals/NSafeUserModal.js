import {
  Box,
  Button,
  Modal,
  Text,
  Toast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import returnSeverityColor from "../../Helpers/returnSeverityColor";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "./ToastMsg";

export default function NSafeUserModal({ showModal, handleCloseModal, id }) {
//   const { storeCtx } = useContext(StoreContext);
//   const [store, setStore] = storeCtx;
  const [modalUser, setModalUser] = useState([]);
  const sendToast = ({ title, desc, stat }) => {
    Toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };
  useEffect(() => {
    if (id == null) return;
    socket.on("retrieve-info-return", ({ status_, info }) => {
      if (status_ == "F")
        return sendToast({
          title: "Failed!",
          desc: "Failed to grab information of selected user",
          stat: "F",
        });
      setModalUser(info);
    });
    socket.emit("retrieve-info", { id });
    return () => {
      socket.off("retrieve-info-return");
    };
  }, [showModal]);

  return (
    <Modal isOpen={showModal} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Person</Modal.Header>
        <Modal.Body>
          {/* <Text>{JSON.stringify(modalUser)}</Text> */}
          <Text>Name: {modalUser.name}</Text>
          <Text>Ethnicity: {modalUser.ethnicity}</Text>
          <Text>Last Seen: {new Date(modalUser.lastSeen).toString()}</Text>
          <Text color={"muted.400"} mt={2}>Medical History</Text>
          <Box bg={"blueGray.700"} rounded={"xl"} p={2}>
          {modalUser.length != 0 ? (
            modalUser.medicalHist.map(({ disease, severity, has }) => {
              return (
                <Box key={disease}>
                  <Text color={returnSeverityColor(severity)}>
                    {disease} : {severity}
                  </Text>
                </Box>
              );
            })
          ) : (
            <Text color={"muted.400"}>No Medical Data</Text>
          )}</Box>
          <Button mt={2}>Signal</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
