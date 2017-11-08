import { Component } from '@angular/core';

import { IRule } from '../../../@core/data/rule';
import { RulesService } from '../../../@core/data/rules.service';

@Component({
  selector: 'waiter-settings-clients',
  templateUrl: './rules.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class RulesComponent {
  rules: IRule[];

  constructor(
    private rulesService: RulesService,
  ) {
    this.rulesService.getAll().subscribe(
      (rules) => {
        this.rules = rules;
      },
      (err) => {
        // no op
      },
    );
  }
}
