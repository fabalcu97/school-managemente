import {Component} from '@angular/core';
import { ResourcesService, Data } from './services';

@Component({
  selector: 'app',
  template: require('./app.component.pug')(),
  styles: [require('./app.styles.styl').toString()],
})
export class AppComponent {

  showLogin: boolean;
  user: any;

  constructor (
    private resources: ResourcesService, private data: Data
  ) {
    this.showLogin = true;
    this.user = {};
  }

  toogleView () {
    this.showLogin = !this.showLogin;
  }

  login () {
    this.resources.login(this.user.email, this.user.password).subscribe(resp => {
      resp = resp[0];
      this.data.setObject('user', resp);
      switch (resp.type) {
        case 'teacher':
          window.location.href = '/teacher-dashboard';
          break;
        case 'student':
          window.location.href = '/student-dashboard';
          break;
        case 'parent':
          window.location.href = '/parent-dashboard';
          break;
        default:
          window.location.href = '/access';
          break;
      }
    }, err => {
      console.error("Error on login", err);
    })
  }

  register () {
    console.log(this.user.type);
    this.user.language = 'es';
    switch (this.user.type) {
      case 'teacher':
        this.resources.registerTeacher(this.user).subscribe(resp => {
          this.login();
        }, err => {
          console.error("Error on register", err);
        })
        break;
      case 'student':
        this.resources.registerStudent(this.user).subscribe(resp => {
          this.login();
        }, err => {
          console.error("Error on register", err);
        })
        break;
      case 'parent':
        this.resources.registerParent(this.user).subscribe(resp => {
          this.login();
        }, err => {
          console.error("Error on register", err);
        });
        break;
      default:
        break;
    }
  }

}