import {
    MongoModel
} from 'n158/classes';
import {
    deferResponse
} from "n158/services";
import {
    ObjectId
} from "mongodb";
import sha256 from "sha256";

import {
    StudentModel
} from "./student";
import {
    TeacherModel
} from "./teacher";
import {
    ParentModel
} from "./parent";

export class PersonModel extends MongoModel {

    constructor(db) {
        super(db, 'person', {
            title: 'Person',
            type: 'object',
            properties: {
                firstName: {
                    type: 'string'
                },
                secondName: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                sex: {
                    type: 'string'
                },
                birthday: {
                    type: 'string'
                },
                language: {},
                legalId: {},
                password: {},
                type: {
                    type: 'string'
                }
            },
            required: ["firstName", 'secondName', "email", "sex", "birthday", "language", "legalId", "password", "type"]
        }, {
            indexes: []
        });
    }

    login(credentials) {
        let deferred = deferResponse();
        this.aggregate([{
            $match: {
                email: credentials.email,
                password: sha256(credentials.password),
            }
        }, {
            $lookup: {
                from: 'teacher',
                foreignField: 'personId',
                localField: '_id',
                as: 'teacher'
            }
        }, {
            $unwind: {
                path: "$teacher",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'student',
                foreignField: 'personId',
                localField: '_id',
                as: 'student'
            }
        }, {
            $unwind: {
                path: "$student",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'parent',
                foreignField: 'personId',
                localField: '_id',
                as: 'parent'
            }
        }, {
            $unwind: {
                path: "$parent",
                preserveNullAndEmptyArrays: true
            }
        }], {}).then((user) => {
            deferred.resolve(user);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    me(personId) {
        let deferred = deferResponse();
        this.aggregate([{
            $match: {
                _id: ObjectId(personId)
            }
        }, {
            $lookup: {
                from: 'teacher',
                foreignField: 'personId',
                localField: '_id',
                as: 'teacher'
            }
        }, {
            $unwind: {
                path: "$teacher",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'student',
                foreignField: 'personId',
                localField: '_id',
                as: 'student'
            }
        }, {
            $unwind: {
                path: "$student",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'parent',
                foreignField: 'personId',
                localField: '_id',
                as: 'parent'
            }
        }, {
            $unwind: {
                path: "$parent",
                preserveNullAndEmptyArrays: true
            }
        }], {}).then((person) => {
            deferred.resolve(person);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}