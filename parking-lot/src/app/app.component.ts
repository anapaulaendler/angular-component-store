import { Component } from '@angular/core';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /** 
   * You inject the service at the component level so that this instance only has 
   * this component and its children.
   */
  providers: [StoreService],
})
export class AppComponent {
  plate = ''
  vm$ = this.store.vm$

  constructor(private store: StoreService) {}

  onSubmit($event: Event) {
    $event.preventDefault()
    this.store.addCarToParkingLot(this.plate)
    this.plate = "";
  }

  addPlate(plate: string): void {
    this.plate = plate;
  }
}
