import { useContext, createContext, useReducer } from "react";
import { States } from "../types/reducerTypes";
import { CtxAction } from "../types/reducerTypes";

export const StateProviderContext = createContext(
  {} as [States, React.Dispatch<CtxAction>]
);

interface StateProviderProps {
  initialState: States;
  reducer: (state: States, action: CtxAction) => States;
  children: React.ReactNode;
}

export const StateProvider = ({
  initialState,
  reducer,
  children,
}: StateProviderProps) => (
  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProviderContext.Provider>
);

export const useContextProvider = () => useContext(StateProviderContext);
