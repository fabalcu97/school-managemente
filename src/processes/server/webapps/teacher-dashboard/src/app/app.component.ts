import {Component} from '@angular/core';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'app',
  template: require('./app.component.pug')(),
  styles: [require('./app.styles.styl').toString()],
})
export class AppComponent {
  modules: any[];

  constructor (
    private stateService: StateService
  ) {
    this.modules = [
      {
        name: 'Exámenes',
        route: 'exams',
      },
      {
        name: 'Estadísticas',
        route: 'stats',
      },
      {
        name: 'Asistentes',
        route: 'stats',
      },
      {
        name: 'Alumnos por clase',
        route: 'stats',
      },
      {
        name: 'Cursos',
        route: 'stats',
      },
      {
        name: 'Integración de áreas',
        route: 'stats',
      },
    ];
  }

  goToModule (m) {
    this.stateService.go(m);
  }

}