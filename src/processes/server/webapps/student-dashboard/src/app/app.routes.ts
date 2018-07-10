import { UserComponent, CoursesComponent, ExamComponent, VideosComponent } from './components';

export var states = [
  { name: 'courses', url: '/courses', component: CoursesComponent },
  { name: 'exam', url: '/exam', component: ExamComponent },
  { name: 'video', url: '/video', component: VideosComponent },
  { name: 'user', url: '/user', component: UserComponent },
];