import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { TestsRoutingModule, routedComponents } from './tests-routing.module';
import { PassportsIssueingComponent } from './passports/passports-issueing.component';

const components = [
  PassportsIssueingComponent,
];

@NgModule({
  imports: [ThemeModule, TestsRoutingModule, AngularEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class TestsModule { }
