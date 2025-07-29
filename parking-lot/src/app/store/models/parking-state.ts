import { Car } from "src/app/models/car";
import { CallStatus } from "./loading-state.enum";
import { ErrorState } from "./error-state";

export type CallState =
  | { status: CallStatus.INIT }
  | { status: CallStatus.LOADING }
  | { status: CallStatus.LOADED }
  | { status: CallStatus.ERROR; errorMsg: string };

export interface ParkingState {
  cars: Car[];
  callState: CallState;
}