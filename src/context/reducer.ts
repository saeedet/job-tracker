import { Job } from "../types/JobTypes";
import { States, CtxAction } from "../types/reducerTypes";

// Initial States
export const initialState: States = {
  display: "jobs",
  jobs: [],
  selectedJobId: "",
  displayInput: false,
  displayDetails: false,
};

// Actions types
const DISPLAY = "DISPLAY";
const SET_JOBS = "SET_JOBS";
const SELECT_JOB = "SELECT_JOB";
const DISPLAY_INPUT = "DISPLAY_INPUT";
const DISPLAY_DETAILS = "DISPLAY_DETAILS";

// Action functions
export const setDisplay = (display: string): CtxAction => ({
  type: DISPLAY,
  payload: {
    display,
  },
});
export const setJobs = (jobs: Job[]): CtxAction => ({
  type: SET_JOBS,
  payload: {
    jobs,
  },
});
export const selectJob = (selectedJobId: string): CtxAction => ({
  type: SELECT_JOB,
  payload: {
    selectedJobId,
  },
});
export const displayInput = (displayInput: boolean): CtxAction => ({
  type: DISPLAY_INPUT,
  payload: {
    displayInput,
  },
});
export const displayDetails = (displayDetails: boolean): CtxAction => ({
  type: DISPLAY_DETAILS,
  payload: {
    displayDetails,
  },
});

// Reducer
export const reducer = (state: States, action: CtxAction) => {
  switch (action.type) {
    case DISPLAY:
      return {
        ...state,
        ...action.payload,
      };
    case SET_JOBS:
      return {
        ...state,
        ...action.payload,
      };
    case SELECT_JOB:
      return {
        ...state,
        ...action.payload,
      };
    case DISPLAY_INPUT:
      return {
        ...state,
        ...action.payload,
      };
    case DISPLAY_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
