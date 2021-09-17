import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from 'projects/layout/src/public-api';
import { MockModule } from '../mock/module.mock';
import { NumbeoComponent } from './numbeo.component';

describe('NumbeoComponent', () => {
  let component: NumbeoComponent;
  let fixture: ComponentFixture<NumbeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LayoutModule, MockModule],
      declarations: [NumbeoComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
