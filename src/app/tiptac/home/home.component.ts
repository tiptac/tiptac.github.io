import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'numbeo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  savingsCalculatorFeature = environment.features.savingsCalculator;
  loanCalculatorFeature = environment.features.loanCalculator;

  constructor() {}

  ngOnInit(): void {}
}
