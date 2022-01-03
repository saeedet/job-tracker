import { useContext, createContext, useReducer, FC } from "react";
import { States } from "../types/reducerTypes";
import { CtxAction } from "../types/reducerTypes";

export const StateProviderContext = createContext(
  {} as [States, React.Dispatch<CtxAction>]
);

interface Props {
  initialState: States;
  reducer: (state: States, action: CtxAction) => States;
}

export const StateProvider: FC<Props> = ({
  initialState,
  reducer,
  children,
}) => (
  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProviderContext.Provider>
);

export const useContextProvider = () => useContext(StateProviderContext);
