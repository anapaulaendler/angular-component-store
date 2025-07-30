import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() select = new EventEmitter<Car>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
