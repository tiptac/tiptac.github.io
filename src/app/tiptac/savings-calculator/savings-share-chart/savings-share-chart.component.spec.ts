import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsShareChartComponent } from './savings-share-chart.component';

describe('SavingsShareChartComponent', () => {
  let component: SavingsShareChartComponent;
  let fixture: ComponentFixture<SavingsShareChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsShareChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsShareChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
