import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-car-container',
  templateUrl: './car-container.component.html',
  styleUrls: ['./car-container.component.scss']
})
export class CarContainerComponent implements OnInit {
  vm$ = this.store.vm$;

  selectedCar?: Car;

  constructor(private store: StoreService) { }

  // handleCreateOrUpdate(car: Partial<Car>) {
  //   if (car.id) {
  //     this.store.updateCar(); // ???????????????????????????????? rever
  //   } else {
  //     this.store.crea
  //   }
  // }

  ngOnInit(): void {
  }

}
