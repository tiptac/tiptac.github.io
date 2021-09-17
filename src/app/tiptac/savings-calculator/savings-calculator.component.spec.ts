import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockModule } from 'src/app/mock/module.mock';
import { SavingsCalculatorComponent } from './savings-calculator.component';

describe('SavingsCalculatorComponent', () => {
  let component: SavingsCalculatorComponent;
  let fixture: ComponentFixture<SavingsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule, FormsModule],
      declarations: [SavingsCalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
