import {Component} from '@angular/core';
import { ResourcesService, Data } from '../../services';

@Component({
  template: require("./template.pug")(),
  styles: [require('./styles.styl').toString()]
})
export class VideosComponent {

  constructor (
    private resources: ResourcesService, private data: Data
  ) {
  }

}