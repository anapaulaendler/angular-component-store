import { Component } from '@angular/core';
import { StoreService } from './store/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StoreService],
})
export class AppComponent {
  vm$ = this.store.vm$;
  form: FormGroup;

  constructor(private store: StoreService, private fb: FormBuilder) {
    this.form = this.fb.group({
      plate: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const plate = this.form.get('plate')?.value;
      this.store.addCarToParkingLot(plate);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  addPlate(plate: string): void {
    this.form.get('plate')?.setValue(plate);
  }
}
