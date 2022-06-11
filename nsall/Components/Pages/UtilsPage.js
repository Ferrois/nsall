import { Box, Center, Text } from "native-base";
import React, { useContext } from "react";
import { StoreContext } from "../../Store/StoreContext";

export default function UtilsPage() {
  const { storeCtx} = useContext(StoreContext);
  const [store,setStore] = storeCtx;
  return (
    <Box>
      <Center>Utilities</Center>
      <Text>{JSON.stringify(store)}</Text>
    </Box>
  );
}
