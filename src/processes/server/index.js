import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {ProcessHandler} from 'n158/classes';
import {connectMongoDb} from 'n158/services';
import {modelMongoTransaction} from 'n158/http-pipeline-handlers';

import { modelsMap } from "../../shared/db-models";

// Setup process handler settings
var procSettingsPath = path.join(__dirname, './settings.yaml');
var procSettings = yaml.safeLoad(fs.readFileSync(procSettingsPath, 'utf-8'));

// Init process handler
var processHandler = new ProcessHandler(procSettings);

// Setup server port
processHandler.set('httpPort', process.env.PORT || processHandler.get('httpPort'));

// Setup models
Object.keys(modelsMap).forEach((k) => {
    processHandler.set('core-db-models/'+k, modelsMap[k]);
});

// Setup webapp
processHandler.set('access-webapp', path.join(__dirname, './webapps/access/dist'));
processHandler.set('teacher-dashboard', path.join(__dirname, './webapps/teacher-dashboard/dist'));
processHandler.set('student-dashboard', path.join(__dirname, './webapps/student-dashboard/dist'));

// Setup handlers
processHandler.set('modelMongoTransactionHandler', modelMongoTransaction);

// Connect to DB
connectMongoDb(
    processHandler.get('dbUrl'), processHandler.get('dbName')
).then((mongoDb) => {
    // Start servers
    processHandler.set('mongoDb', mongoDb);
    console.log("Connected to database");

    processHandler.startHTTPServers().then((results) => {
        results.forEach((r) => {
            console.log('HTTP Server '+r.serverName+' is running at port '+r.ports.http);
        });
    });
}).catch((err) => {
    console.error("Error connecting db =>", err);
});