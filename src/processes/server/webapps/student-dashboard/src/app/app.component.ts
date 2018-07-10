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
        name: 'Cursos',
        route: 'courses',
      },
      {
        name: 'Agenda',
        route: 'exam',
      },
      {
        name: 'Videos Explicativos',
        route: 'video',
      },
      {
        name: 'Resultados',
        route: 'exam',
      },
      {
        name: 'Plan lector',
        route: 'exam',
      },
      {
        name: 'Razonamiento matemático',
        route: 'exam',
      },
      {
        name: 'Curiosidades',
        route: 'exam',
      },
      {
        name: 'Vocabulario',
        route: 'exam',
      },
      {
        name: 'Mi perfil',
        route: 'user',
      },
    ];
  }

  goToModule (m) {
    this.stateService.go(m);
  }

}