import { Box, ScrollView, Text } from "native-base";
import React, { useContext } from "react";
import { StoreContext } from "../../../Store/StoreContext";

export default function TipsPage() {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  return (
    <Box>
      <ScrollView mb={32}>
        <Text>Tips page</Text>
        <Text>{JSON.stringify(store)}</Text>
      </ScrollView>
    </Box>
  );
}
