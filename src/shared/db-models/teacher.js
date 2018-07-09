import {MongoModel} from 'n158/classes';
import { ObjectId } from "mongodb";
import {deferResponse} from "n158/services";
import sha256 from 'sha256';

import { PersonModel } from "./person";

export class TeacherModel extends MongoModel {

    constructor (db) {
        super(db, 'teacher', {
            title: 'Teacher',
            type: 'object',
            properties: {
                personId: {},
                classes: {},
                courses: {},
            },
            required: [ "personId" ]
        }, {
            indexes: []
        });
    }

    register (registerForm) {
        let deferred = deferResponse();
        let person = new PersonModel(this.db);
        registerForm.password = sha256(registerForm.password);
        registerForm.type = "teacher";
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