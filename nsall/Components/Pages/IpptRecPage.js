import { Box, Button, Center } from "native-base";
import React, { useContext } from "react";
import { StoreContext } from "../../Store(Context)/StoreContext";

export default function IpptRecPage() {
  //Local store
  // const { localStoreCtx } = useContext(StoreContext);
  // const [localStore, setLocalStore, isPending] = localStoreCtx;

  // const handleIncrement = () => {
	// 	setLocalStore({counter:localStore.counter + 1} || {counter:1})
	// };
  return (
    <Box safeArea>
      <Center>
        {/* <Button onPress={handleIncrement}>Increment</Button> */}
      </Center>
    </Box>
  );
}
