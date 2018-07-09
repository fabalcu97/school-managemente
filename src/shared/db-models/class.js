import {MongoModel} from 'n158/classes';
import {deferResponse} from "n158/services";

export class ClassModel extends MongoModel {

    constructor (db) {
        super(db, 'class', {
            title: 'Class',
            type: 'object',
            properties: {
                courses: {},
            },
            required: [ "courses" ]
        }, {
            indexes: []
        });
    }

}