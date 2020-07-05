import counterStore from "./counter";
import userInfoStore from "./user_info";
import orderStore from "./order";
import {createContext, useContext} from "react";

const store = {
  counterStore,
  userInfoStore,
  orderStore
}

const StoresContext = createContext(store)

const useStores = () => useContext(StoresContext)

function useUserInfoStore() {
  const {userInfoStore} = useStores();
  return userInfoStore
}

function useOrderStore() {
  const {orderStore} = useStores();
  return orderStore
}

export {
  store,
  useUserInfoStore,
  useOrderStore
}
