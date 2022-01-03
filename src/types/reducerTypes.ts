import { Job } from "./JobTypes";

export interface States {
  display: string;
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
