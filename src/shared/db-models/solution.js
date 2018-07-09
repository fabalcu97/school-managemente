import {MongoModel} from 'n158/classes';
import {deferResponse} from "n158/services";

export class SolutionModel extends MongoModel {

    constructor (db) {
        super(db, 'solution', {
            title: 'Solution',
            type: 'object',
            properties: {
                examId: {},
                studentId: {},
                data: {},
            },
            required: [ "teacherId", 'courseId', "questions", "answers" ]
        }, {
            indexes: []
        });
    }

}