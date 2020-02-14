var fs = require('fs');
exports.config=function readFile(url) {
    var data = fs.readFileSync(url,'utf-8')
    return JSON.parse(data.toString());
}

