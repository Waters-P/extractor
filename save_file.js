
const fs = require("fs");

let path = "text.mp3"; 

let data = "we did the thang\n";


fs.writeFileSync(path, data);