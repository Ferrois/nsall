import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../Store/StoreContext";

export default function SettingsPage() {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
  };

  return (
    <Box flex={1} mt={"16"}>
      <ScrollView>
        <Center>
          <Text fontSize={"3xl"}>Settings</Text>
          <VStack w="80%" alignItems="center" justifyContent={"space-between"}>
            <Text mt={4} color={"black"} fontSize={"20"} fontWeight={"bold"}>
              NS admission date
            </Text>
            <Button
              onPress={() => {
                setShow(true);
              }}
              mt={"2"}
            >
              <Text fontWeight={"bold"} fontSize={"15"} color={"white"}>
                {" "}
                Set Counter
              </Text>
            </Button>
          </VStack>
          <Text color={"black"} fontSize={"20"} fontWeight={"400"} mt={"2"}>
            Date: {" "} {date ? date.toDateString() : "No date selected"}
          </Text>
        </Center>
      </ScrollView>
      {show && <DateTimePicker value={new Date()} onChange={onChange} />}
    </Box>
  );
}
