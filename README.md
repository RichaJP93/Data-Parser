# Data Parser

## Usage

To run this script from the root directory of the project, use the command

```bash
node ./src/parse.js path/to/log_directory/
```

For example if the directory to be processed is in the root directory of the project:

```bash
node ./src/parse.js 20131004
```

This will output CSV files in the same /src directory as the script, with unique file names for each file in the directory

**E.g**

*src/result-1.csv*

**Assumptions & notes**

- Assuming the input files will all match the same headers as app, deviceToken, deviceTokenStatus, tags
- Assuming the ini file will keep the same format for each app code: output = input
- Assuming there will be a valid folder with .log files to process
- Tags that are unknown or do not fill into the accepted groups have not yet been accounted for, could possibly add an extra heading to the csv output of unknown tags
- Assumed that each input file needs a corresponding result.csv file
- Time taken: approx 8hours

