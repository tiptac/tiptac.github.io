import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'sample',
    loadChildren: () =>
      import('./sample/sample.module').then((m) => m.SampleModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tiptac/tiptac.module').then((m) => m.NumbeoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
