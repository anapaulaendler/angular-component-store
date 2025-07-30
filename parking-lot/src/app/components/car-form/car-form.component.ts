import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnChanges {
  @Input() initialValue?: Car;
  @Output() submitCar = new EventEmitter<Partial<Car>>();

  form = this.fb.nonNullable.group({
    id: ['', Validators.required],
    plate: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required],
    brand: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue) {
      this.form.patchValue(this.initialValue);
    }
  }

  submit() {
    if (this.form.valid) {
      this.submitCar.emit(this.form.value);
      this.form.reset();
    }
  }
}
