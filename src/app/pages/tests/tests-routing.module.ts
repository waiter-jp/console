import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestsComponent } from './tests.component';
import { PassportsComponent } from './passports/passports.component';

const routes: Routes = [{
  path: '',
  component: TestsComponent,
  children: [
    {
      path: 'passports',
      component: PassportsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsRoutingModule { }

export const routedComponents = [
  TestsComponent,
  PassportsComponent,
];
