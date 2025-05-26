import fs from 'fs';
import path from 'path';

import { parseLogFile } from './parse-logfile.js';

const idObject = {
    value: 1
};

let fileNum = 1;

export const parseDirectory = (directory) => {
    try {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err.message}`);
                return;
            } else {
                console.log(`Reading directory: ${directory}`);
                files.forEach((file) => {
                    if (file.endsWith('.log')) {
                        const filePath = path.join(directory, file);
                        console.log(`Processing file: ${file}`);
                        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

                        parseLogFile(readStream, idObject, fileNum);
                        fileNum++;
                    }
                });
            }
        });
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
    }

}

