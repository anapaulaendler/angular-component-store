import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarContainerComponent } from './car-container.component';

describe('CarContainerComponent', () => {
  let component: CarContainerComponent;
  let fixture: ComponentFixture<CarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
