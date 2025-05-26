import fs from 'fs';

import { checkTags } from './check-tags.js';
import { parseINIFile } from './ini-parser.js';
import { exportCSV } from './export-csv.js';

const appCodesFile = fs.readFileSync('./config/appCodes.ini', 'utf8');
const appCodesObject = parseINIFile(appCodesFile);

const headers = [
    'id',
    'appCode',
    'deviceId',
    'contactable',
    'subscription_status',
    'has_downloaded_free_product_status',
    'has_downloaded_iap_product_status'
]

const getAppCode = (appCodes, app) => {
    return Object.keys(appCodes).find(key => appCodes[key] === app);
}

export const parseLogFile = async (readStream, idObject, fileNum) => {
    const rows = [headers];
    try {
        for await (const chunk of readStream) {
            // split the chunk into lines
            var lines = chunk.split(/[\r\n]+/);
            lines.forEach((line, index) => {
                // skip empty lines and the first line (header)
                if(line.length == 0){
                    return;
                } 
                if(index === 0) {
                    return;
                }
                // split the line by comma to get individual parts
                const parts = line.split(',')

                const app = parts[0];
                const appCode = getAppCode(appCodesObject.appcodes, app);
                const deviceId = parts[1];
                const deviceTokenStatus = parts[2];

                var statuses = ['','',''];
                var contactable = 0;

                if (deviceTokenStatus == '1') {
                    contactable = 1;
                } 

                //If there are tags, check them
                if(parts[3] != undefined && parts[3] != ''){
                    const tagsArray = parts[3].split('|');
                    tagsArray.forEach((tag) => {
                        checkTags(statuses, tag);                      
                    })
                } 

                // If no tags were found, set default statuses
                statuses.forEach((status, index) => {
                    if (status === '') {
                        if (index === 0) {
                            statuses[index] = 'subscription_unknown'; // Default to never_subscribed if no subscription tag is found
                        } else if (index === 1) {
                            statuses[index] = 'downloaded_free_product_unknown'; // Default to unknown for free product
                        } else if (index === 2) {
                            statuses[index] = 'downloaded_iap_product_unknown'; // Default to unknown for IAP product
                        }
                    }
                });
                // Create a row with the parsed data
                const row = [idObject.value, appCode, deviceId, contactable, statuses[0], statuses[1], statuses[2]];
                rows.push(row);
                idObject.value++;
            })
            
        }
        exportCSV(rows, fileNum);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}
