"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
function fromDir(startPath, filter, callback) {
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
        else if (filter.test(filename))
            callback(filename);
    }
    ;
}
exports.fromDir = fromDir;
;
function getSubStringBetweenTwoStrings(inputText, startStr, endStr) {
    if (inputText.indexOf(startStr) && inputText.indexOf(endStr)) {
        let startIndex = inputText.indexOf(startStr) + startStr.length;
        let endIndex = inputText.indexOf(endStr);
        return inputText.substring(startIndex, endIndex);
    }
    else {
        throw new Error('Start or End strings are not contained in text');
    }
}
exports.getSubStringBetweenTwoStrings = getSubStringBetweenTwoStrings;
;
// fromDir('../LiteScript', /\.html$/, function (filename) {
//     console.log('-- found: ', filename);
// });

//# sourceMappingURL=source_maps/utils.js.map
