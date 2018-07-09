import {MongoModel} from 'n158/classes';
import {deferResponse} from "n158/services";

export class OrganizationModel extends MongoModel {

    constructor (db) {
        super(db, 'organization', {
            title: 'Organization',
            type: 'object',
            properties: {
                name: { type: 'string' },
                legalId: { },
            },
            required: [ "name", "legalId" ]
        }, {
            indexes: []
        });
    }

}