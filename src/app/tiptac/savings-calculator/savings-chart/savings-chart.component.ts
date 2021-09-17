import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'tiptac-app-savings-chart',
  templateUrl: './savings-chart.component.html',
  styleUrls: ['./savings-chart.component.css'],
})
export class SavingsChartComponent implements OnInit {
  @Input() model: SavingsChartModel;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: this.translateService.instant(
              'blog.savingsCalculator.time.label'
            ),
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: this.translateService.instant(
              'blog.savingsCalculator.amount'
            ),
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  };
  public chartLegend = true;
  public chartPlugins = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {}
}

export interface SavingsChartModel {
  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartColors: Color[];
}
