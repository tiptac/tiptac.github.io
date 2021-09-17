import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'tiptac-app-savings-share-chart',
  templateUrl: './savings-share-chart.component.html',
  styleUrls: ['./savings-share-chart.component.css'],
})
export class SavingsShareChartComponent implements OnInit {
  @Input() model: SavingsShareChartModel;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {}

  ngOnInit() {}
}

export interface SavingsShareChartModel {
  chartData: SingleDataSet;
  chartLabels: Label[];
  chartColors: Color[];
}
