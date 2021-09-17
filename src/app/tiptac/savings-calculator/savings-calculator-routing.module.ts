import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavingsCalculatorComponent } from './savings-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: SavingsCalculatorComponent,
    data: {
      breadCrumb: 'blog.savingsCalculator.title',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingsCalculatorRoutingModule {}
