import {MongoModel} from 'n158/classes';
import {deferResponse} from "n158/services";

export class SessionModel extends MongoModel {

    constructor (db) {
        super(db, 'session', {
            title: 'Session',
            type: 'object',
            properties: {
                personId: {},
            },
            required: [ "personId" ]
        }, {
            indexes: []
        });
    }

}