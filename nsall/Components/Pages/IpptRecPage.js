import { Box, Button, Center, Text } from "native-base";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Store/StoreContext";

export default function IpptRecPage() {
  // Local store
  // const { localStoreCtx } = useContext(StoreContext);
  // const [localStore, setLocalStore, isPending] = localStoreCtx;

	const {storeCtx} = useContext(StoreContext);
	const [store,setStore] = storeCtx
	useEffect(()=>{
		setStore({counter:1})
	},[])
  const handleIncrement = () => {
		setStore({counter:store.counter + 1})
	};
  return (
    <Box safeArea>
      <Center>
        <Button onPress={handleIncrement}>Increment</Button>
				<Text>{store.counter}</Text>
      </Center>
    </Box>
  );
}
