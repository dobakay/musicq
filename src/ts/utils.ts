var path = require('path');
var fs = require('fs');

export function fromDir(startPath: String, filter: RegExp, callback: Function) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

export function getSubStringBetweenTwoStrings(inputText:string, startStr:string, endStr:string):string {
    if(inputText.indexOf(startStr) && inputText.indexOf(endStr)) {
        let startIndex = inputText.indexOf(startStr) + startStr.length;
        let endIndex = inputText.indexOf(endStr);
        return inputText.substring(startIndex, endIndex);
    } else {
        throw new Error('Start or End strings are not contained in text');
    }
};

// fromDir('../LiteScript', /\.html$/, function (filename) {
//     console.log('-- found: ', filename);
// });