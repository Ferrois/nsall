import {
  Button,
  FormControl,
  Input,
  Modal,
  Select,
  Text,
  useToast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "./ToastMsg";

export default function NSafeUserModal({ showModal, handleCloseModal, id }) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [modalUser,setModalUser] = useState([])
  const toast = useToast();
  const sendToast = ({ title, desc, stat }) => {
    toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };
  useEffect(()=>{
    socket.on("retrieve-info-return",({status_,info})=>{
        if (status_ == "F") return sendToast({title:"Failed!",desc:"Failed to grab information of selected user",stat:"F"})
        setModalUser(info);
    })
    socket.emit("retrieve-info",({id}))
    return () => {socket.off("retrieve-info-return")}
  },[showModal])

  return (
    <Modal isOpen={showModal} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Person Info</Modal.Header>
        <Modal.Body>
<Text>{JSON.stringify(modalUser)}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
