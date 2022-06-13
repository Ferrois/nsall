import { Box, Button, Center, Text } from "native-base";
import React, { useContext } from "react";
import { StoreContext } from "../../Store/StoreContext";

export default function UtilsPage() {
  const { storeCtx, themeCtx} = useContext(StoreContext);
  const [store,setStore] = storeCtx;
  const [theme, setTheme]= themeCtx
  return (
    <Box>
      <Center>Utilities</Center>
      <Button title="Switch to Dark Mode" onPress={() => setTheme("dark")} />
      <Text>{JSON.stringify(store)}</Text>
    </Box>
  );
}
