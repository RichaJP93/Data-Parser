export function parseINIFile(file){
    // Parses a string in INI format and returns an object

    // regex patterns for matching [sections] and parameters key = value
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/
    };
    var appCodes = {};
    var lines = file.split(/[\r\n]+/);
    var section = null;

    lines.forEach((line) => {
       // if the line is a key value pair/ parameter
       // extract the key and value
        if(regex.param.test(line)){
            var match = line.match(regex.param);
            // remove quotes from key and value
            var key = match[1].replace(/^"(.*)"$/, '$1');
            var value = match[2].replace(/^"(.*)"$/, '$1');
            // if inside a section, 
            // store the key value pair in that section in appCodes
            // else store it in the root of appCodes
            if(section){
                appCodes[section][key] = value;
            } else {
                appCodes[key] = value;
            }
        } 
        // else if the line is a section 
        // extract the section name and create an empty object for it in appCodes
        else if(regex.section.test(line)){
            var match = line.match(regex.section);
            appCodes[match[1]] = {};
            section = match[1];
        } 
        // else if the line is empty and a section is open
        // close the section
        else if(line.length == 0 && section){
            section = null;
        };
    });

    return appCodes;
}