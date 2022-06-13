import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, Button, Center, ScrollView, Text } from "native-base";
import React, { useState } from "react";

export default function SettingsPage() {
  const [show,setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
  };

  return (
    <Box flex={1} safeArea mt={"16"}>
      <ScrollView>
        <Center>
          <Text fontSize={"3xl"}>Settings</Text>
          <Text mt={4} color={"muted.400"}>Pick the time at which you got admitted to NS</Text>
          <Button onPress={()=>{setShow(true)}}>Set Counter</Button>
        </Center>
      </ScrollView>
      {show && (
        <DateTimePicker
          value={new Date()}
          onChange={onChange}
        />
      )}
    </Box>
  );
}
