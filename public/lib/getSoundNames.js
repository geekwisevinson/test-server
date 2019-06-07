const fs = require('fs');

const files = fs.readdirSync(__dirname + '/wave-tables');

console.log(files);
