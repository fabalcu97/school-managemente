import {Component} from '@angular/core';
import { StateService } from '@uirouter/core';

import { ResourcesService, Data } from '../../services';

@Component({
  template: require("./template.pug")(),
  styles: [require('./styles.styl').toString()]
})
export class CoursesComponent {

  exam:any;

  constructor (
    private resources: ResourcesService, private data: Data, private stateService: StateService
  ) {
  }

  show(ss) {
    this.exam = ss;
  }

}