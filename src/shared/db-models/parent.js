import { MongoModel } from 'n158/classes';
import { deferResponse } from "n158/services";
import sha256 from 'sha256';

import { PersonModel } from "./person";

export class ParentModel extends MongoModel {

    constructor (db) {
        super(db, 'parent', {
            title: 'Parent',
            type: 'object',
            properties: {
                personId: {},
                studentId: {},
            },
            required: [ "personId", 'studentId' ]
        }, {
            indexes: []
        });
    }

    register (registerForm) {
        let deferred = deferResponse();
        let person = new PersonModel(this.db);
        registerForm.password = sha256(registerForm.password);
        registerForm.type = "parent";
        person.register(registerForm).then((person) => {
            super.register({
                personId: ObjectId(person._id),
            }).then((teacher) => {
                deferred.resolve(teacher);
            }).catch((err) => {
                deferred.reject(err);
            });
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}