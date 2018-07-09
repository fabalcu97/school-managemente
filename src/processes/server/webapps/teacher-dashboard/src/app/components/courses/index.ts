import {Component} from '@angular/core';
import { ResourcesService, Data } from '../../services';

@Component({
  template: require("./template.pug")(),
  styles: [require('./styles.styl').toString()]
})
export class CoursesComponent {

  courses: any[];
  selectedCourse: any;
  exams: any[];
  showModal: boolean;
  currentExam: any;
  currentQuestion: any;
  options: any;
  answers: any;
  questionType: boolean;

  constructor (
    private resources: ResourcesService, private data: Data
  ) {
    this.getCourses();
  }

  getCourses () {
    this.resources.getCourses().subscribe(resp => {
      this.courses = resp;
    }, err => {
      console.error("Error getting courses =>", err);
    });
  }

  openExam (exam?) {
    this.showModal = !this.showModal;
    this.currentExam = exam || {};
    if ( !this.currentExam.questions ) {
      this.currentExam.questions = [];
    }
  }

  selectCourse (course) {
    this.exams = [];
    this.selectedCourse = course;
    this.getExams();
  }

  getExams () {
    this.resources.getExams(this.selectedCourse._id, this.data.getObject('user').teacher._id ).subscribe(resp => {
      this.exams = resp;
    }, err => {
      console.error("Error getting exams =>", err);
    });
  }

  editQuestion (question?) {
    this.currentQuestion = question || {};
    this.options = this.currentQuestion.questions || ['', '', '', ''];
  }

  toogleModal () {
    this.showModal = !this.showModal;
  }

}