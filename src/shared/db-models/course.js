import {MongoModel} from 'n158/classes';
import {deferResponse} from "n158/services";

export class CourseModel extends MongoModel {

    constructor (db) {
        super(db, 'course', {
            title: 'Course',
            type: 'object',
            properties: {
                name: {},
                subjects: {},
            },
            required: []
        }, {
            indexes: []
        });
    }

}