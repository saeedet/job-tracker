import { Job } from "./JobTypes";

export interface States {
  display: Display;
  jobs: [] | Job[];
  selectedJobId: string;
  displayInput: boolean;
  displayDetails: boolean;
}

export interface CtxAction {
  type: string;
  payload: CtxPayload;
}

export type CtxPayload = Partial<States>;

export enum Display {
  JOBS = "JOBS",
  CALENDAR = "CALENDAR",
}
