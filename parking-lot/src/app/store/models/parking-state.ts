import { Car } from "src/app/models/car";
import { LoadingState } from "./loading-state.enum";
import { ErrorState } from "./error-state";

export type CallState = LoadingState | ErrorState;

export interface ParkingState {
  cars: Car[];
  callState: CallState;
}