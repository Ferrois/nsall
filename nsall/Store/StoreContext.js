import React, { createContext, useState } from "react";
import { useAsyncStorage } from "../Hooks/useAsyncStorage.js"

//Allows for global state manaegement of the app

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  // const [localStore, setLocalStore, isPending] = useAsyncStorage("nsall:ls", {});
  const [store, setStore] = useState({});
  return (
    <StoreContext.Provider
      value={{
        // localStoreCtx: [localStore, setLocalStore, isPending],
        storeCtx: [store, setStore],
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
