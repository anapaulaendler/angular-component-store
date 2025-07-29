import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable, of, throwError } from 'rxjs';

const data: Car[] = [
    {
        plate: '2FMDK3',
        brand: 'Volvo',
        model: '960',
        color: 'Violet',
    },
    {
        plate: '1GYS4C',
        brand: 'Saab',
        model: '9-3',
        color: 'Purple',
    },
    {
        plate: '1GKS1E',
        brand: 'Ford',
        model: 'Ranger',
        color: 'Indigo',
    },
    {
        plate: '1G6AS5',
        brand: 'Volkswagen',
        model: 'Golf',
        color: 'Aquamarine',
    },
]

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private readonly baseUrl = 'http://localhost:5150/api/cars';
  private cars: Car[] = []

  constructor(private http: HttpClient) { }

  add(plate: string): Observable<Car> {
    try {
      const existingCar = this.cars.find((eCar: Car) => eCar.plate === plate)

      if (existingCar) {
        throw `This car with plate ${plate} is already parked.`
      }

      const car = this.getCarByPlate(plate)
      this.cars = [...this.cars, car]

      return of(car)
    } catch (error) {
      // throwError(error) is deprecated!
      return throwError(() => error);
    }
  }

  private getCarByPlate(plate: string): Car {
    const car = data.find((item: Car) => item.plate === plate)

    if (car) {
      return car
    }

    throw `The car with plate ${plate} is not registered.`
  }
}
