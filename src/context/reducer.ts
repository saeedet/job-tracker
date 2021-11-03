import { States } from "../types/JobTypes";

export const initialState: States = {
  display: "jobs",
  jobs: [],
  selectedJob: "",
  displayInput: false,
  displayDetails: false,
};

export const reducer = (state: States, action: any) => {
  switch (action.type) {
    case "display":
      return {
        ...state,
        display: action.payload,
      };
    case "setJobs":
      return {
        ...state,
        jobs: action.payload,
      };
    case "selectJob":
      return {
        ...state,
        selectedJob: action.payload,
      };
    case "displayInput":
      return {
        ...state,
        displayInput: action.payload,
      };
    case "displayDetails":
      return {
        ...state,
        displayDetails: action.payload,
      };
    default:
      return state;
  }
};
