import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoanCalculatorRoutingModule } from './loan-calculator-routing.module';
import { LoanCalculatorComponent } from './loan-calculator.component';

@NgModule({
  declarations: [LoanCalculatorComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    LoanCalculatorRoutingModule,
  ],
})
export class LoanCalculatorModule {}
