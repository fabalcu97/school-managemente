import { ClassModel } from "./class";
import { ExamModel } from "./exam";
import { PersonModel } from "./person";
import { SessionModel } from "./session";
import { SolutionModel } from "./solution";
import { StudentModel } from "./student";
import { TeacherModel } from "./teacher";
import { ParentModel } from "./parent";
import { CourseModel } from "./course";
import { OrganizationModel } from "./organization";

export {
    ClassModel,
    ExamModel,
    PersonModel,
    SessionModel,
    SolutionModel,
    StudentModel,
    TeacherModel,
    OrganizationModel,
    ParentModel,
    CourseModel,
}

export let modelsMap = {
    Class: ClassModel,
    Exam: ExamModel,
    Person: PersonModel,
    Session: SessionModel,
    Solution: SolutionModel,
    Student: StudentModel,
    Teacher: TeacherModel,
    Organization: OrganizationModel,
    Parent: ParentModel,
    Course: CourseModel,
}