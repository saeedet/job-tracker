import { States, CtxAction } from "../types/reducerTypes";

export const initialState: States = {
  display: "jobs",
  jobs: [],
  selectedJob: "",
  displayInput: false,
  displayDetails: false,
};

export const reducer = (state: States, action: CtxAction) => {
  switch (action.type) {
    case "display":
      return {
        ...state,
        ...action.payload,
      };
    case "setJobs":
      return {
        ...state,
        ...action.payload,
      };
    case "selectJob":
      return {
        ...state,
        ...action.payload,
      };
    case "displayInput":
      return {
        ...state,
        ...action.payload,
      };
    case "displayDetails":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
