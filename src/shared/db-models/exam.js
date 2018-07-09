import {MongoModel} from 'n158/classes';
import { ObjectId } from "mongodb";
import {deferResponse} from "n158/services";

export class ExamModel extends MongoModel {

    constructor (db) {
        super(db, 'exam', {
            title: 'Exam',
            type: 'object',
            properties: {
                name: {},
                teacherId: {},
                courseId: {},
                questions: {},
            },
            required: [ "name", "teacherId", 'courseId', "questions" ]
        }, {
            indexes: []
        });
    }

    findExams (teacherId, courseId) {
        let deferred = deferResponse();
        this.findAll({
            teacherId: ObjectId(teacherId),
            courseId: ObjectId(courseId),
        }).then((exams) => {
            deferred.resolve(exams);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}