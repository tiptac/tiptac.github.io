import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanCalculatorComponent } from './loan-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: LoanCalculatorComponent,
    data: {
      breadCrumb: 'blog.loanCalculator.title',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanCalculatorRoutingModule {}
