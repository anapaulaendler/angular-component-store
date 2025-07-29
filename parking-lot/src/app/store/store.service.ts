import { Injectable } from '@angular/core';
import { CallState, ParkingState } from './models/parking-state';
import { CallStatus } from './models/loading-state.enum';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ParkingLotService } from '../services/parking-lot.service';
import { catchError, concatMap, EMPTY, Observable } from 'rxjs';
import { Car } from '../models/car';

function getError(callState: CallState): string | null {
  return callState.status === CallStatus.ERROR ? callState.errorMsg : null;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService extends ComponentStore<ParkingState> {

  constructor(private parkingLotService: ParkingLotService) { 
    super({
      cars: [],
      callState: { status: CallStatus.INIT }
    });
  }

  /**
   * SELECTORS: You select and subscribe to the state, either all or parts of it.
   * 
   * - cars$: to get the array of cars
   * - loading$: to get a boolean while LoadingState.LOADING
   * - error$: to get the error message
  */
  private readonly cars$: Observable<Car[]> = this.select(state => state.cars);
  private readonly loading$: Observable<boolean> = this.select(state => state.callState.status === CallStatus.LOADING);
  private readonly error$: Observable<string | null> = this.select(state => getError(state.callState)); // TODO: ? rever esse 'Observable<string | null>'

  /**
   * And the fourth selector vm$ is the View Model for the component which collects all the data needed for the template. 
   * In this case we use the select method to combine other selectors. 
   */
  readonly vm$ = this.select(
    this.cars$,
    this.loading$,
    this.error$,
    (cars, loading, error) => ({
      cars,
      loading,
      error
    })
  );

  /**
   * UPDATERS: To update the state. It can be parts or in whole.
   * 
   * - To update the state, you will need three updaters:
   * - To add or remove the error message
   * - To update the loading
   * - To add cars to the parking lot
   */
  readonly updateError = this.updater((state: ParkingState, error: string) => ({
    ...state,
    callState: {
      status: CallStatus.ERROR,
      errorMsg: error
    }
  }));

  readonly setLoading = this.updater((state: ParkingState) => ({
    ...state,
    callState: { status: CallStatus.LOADING }
  }));

  readonly setLoaded = this.updater((state: ParkingState) => ({
    ...state,
    callState: { status: CallStatus.LOADED }
  }));

  readonly updateCars = this.updater((state: ParkingState, car: Car) => ({
    ...state,
    error: "",
    cars: [...state.cars, car]
  }));

  /**
   * EFFECTS: It is also to update the state but do some other necessary task beforehand. 
   * For example, an HTTP request to an API.
   * 
   * To add a car to the parking lot, you have to create an effect because you have to 
   * make a request to an API with the car’s license plate, and when it responds, the 
   * state is updated.
   * 
   * We use the effect method that receives a callback with the value that we pass as an 
   * Observable to create effects. Keep in mind that each new call of the effect would 
   * push the value into that Observable.
   * 
   * In this code, you can see that the effect:
   * - Receive the car license plate as an Observable
   * - Update the state of loading
   * - Request the API to add the car to the parking lot using the ParkingLotService
   */
  readonly addCarToParkingLot = this.effect((plate$: Observable<string>) => {
    return plate$.pipe(
      concatMap((plate: string) => {
        this.setLoading();
        return this.parkingLotService.add(plate).pipe(
          tapResponse(
            car => {
              this.setLoaded();
              this.updateCars(car);
            },
            (e: string) => this.updateError(e)
          ),

          catchError(() => EMPTY)
        );
      })
    );
  });
}
