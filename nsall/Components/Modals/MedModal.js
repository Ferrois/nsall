import { Button, FormControl, Input, Modal, Select, useToast } from "native-base";
import React, { useContext, useState } from "react";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "./ToastMsg";

export default function MedModal({ showModal, handleCloseModal }) {
    const {storeCtx} = useContext(StoreContext)
    const [store,setStore] = storeCtx
    const toast = useToast();
    const [severity, setSeverity] = useState("");
    const [disease,setDisease] = useState("");
    const sendToast = ({ title, desc, stat }) => {
        toast.show({
          render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
          placement: "top",
        });
      };
    const handleSubmit = () => {
        if (disease == "") return sendToast({title:"Error!",desc:"You must have a disease",stat:"F"})
        if (severity == "") return sendToast({title:"Error!",desc:"You must set a severity",stat:"F"})
        socket.emit("addmedinfo",{disease,severity,has:true,id:store.userInfo.id})
        setDisease("");
    }
    
  return (
    <Modal isOpen={showModal} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Disease</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Disease</FormControl.Label>
            <Input value={disease} onChangeText={value=>setDisease(value)}/>
          </FormControl>
          <FormControl mt="2">
            <FormControl.Label>Severity</FormControl.Label>
            <Select
              selectedValue={severity}
              minWidth="200"
              placeholder="Severity"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(itemValue) => setSeverity(itemValue)}
            >
              <Select.Item label="Severe" value="Severe" />
              <Select.Item label="Moderate" value="Moderate" />
              <Select.Item label="Mild" value="Mild" />
            </Select>
          </FormControl>
          <Button onPress={handleSubmit} mt={2}>Submit</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
