import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TiptacComponent } from './tiptac.component';

const routes: Routes = [
  {
    path: '',
    component: TiptacComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          breadCrumb: 'home',
        },
      },
      {
        path: 'savings-calculator',
        loadChildren: () =>
          import('./savings-calculator/savings-calculator.module').then(
            (m) => m.SavingsCalculatorModule
          ),
      },
      {
        path: 'loan-calculator',
        loadChildren: () =>
          import('./loan-calculator/loan-calculator.module').then(
            (m) => m.LoanCalculatorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumbeoRoutingModule {}
