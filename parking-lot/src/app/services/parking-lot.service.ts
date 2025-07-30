import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable, of, throwError } from 'rxjs';

const data: Car[] = [
  { plate: '2FMDK3', brand: 'Volvo', model: '960', color: 'Violet' },
  { plate: '1GYS4C', brand: 'Saab', model: '9-3', color: 'Purple' },
  { plate: '1GKS1E', brand: 'Ford', model: 'Ranger', color: 'Indigo' },
  { plate: '1G6AS5', brand: 'Volkswagen', model: 'Golf', color: 'Aquamarine' },
];

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private readonly baseUrl = 'http://localhost:5150/api/cars';
  private cars: Car[] = [];

  constructor(private http: HttpClient) { }

  /** local pq ta sendo usado como se o mock fosse os carros estacionados agr. 
   * mas da p cadastrar carro no db tb (crud completo) */
  private getCarByPlateLocal(plate: string): Car {
    const car = data.find(c => c.plate === plate);
    if (!car) throw `The car with plate ${plate} is not registered.`;
    return car;
  }

  addToParkingLot(plate: string): Observable<Car> {
    try {
      const existingCar = this.cars.find(c => c.plate === plate);
      if (existingCar) {
        throw `This car with plate ${plate} is already parked.`;
      }
      const car = this.getCarByPlateLocal(plate);
      this.cars = [...this.cars, car];
      return of(car);
    } catch (error) {
      return throwError(() => error);
    }
  }

  add(plate: string): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}`, { plate });
  }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl);
  }

  getById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`);
  }

  getByPlate(plate: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/plate/${plate}`);
  }

  update(id: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/${id}`, car);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}