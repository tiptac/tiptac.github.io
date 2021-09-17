import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { SavingsCalculatorRoutingModule } from './savings-calculator-routing.module';
import { SavingsCalculatorComponent } from './savings-calculator.component';
import { SavingsChartComponent } from './savings-chart/savings-chart.component';
import { SavingsShareChartComponent } from './savings-share-chart/savings-share-chart.component';

@NgModule({
  declarations: [
    SavingsCalculatorComponent,
    SavingsChartComponent,
    SavingsShareChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    SavingsCalculatorRoutingModule,
    NgxBootstrapSliderModule,
    ChartsModule,
  ],
})
export class SavingsCalculatorModule {}
