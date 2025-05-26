import { parseDirectory } from './utils/parse-directory.js';

const directory = process.argv[2] || '';

if (!directory) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1);
}

parseDirectory(directory)

