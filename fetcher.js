//use request
const request = require('request');
//use node fs module
const fs = require('fs');

const consoleInput = process.argv.slice(2);
//red through input

fs.readFile(consoleInput[1], 'utf8', function(err, data) {
  if (err){
    console.log(err);
  } else{
    fetchPage(consoleInput,writeFile);
  }
});

const fetchPage = (consoleInput, writeToFile) => {
  request(consoleInput[0], (error, response, body) => {
    var obj = {};
    if(!error){
      obj['filePath'] = consoleInput[1];
      obj['data'] = body;
      obj['length'] = body.length;
      writeToFile(obj);
    } else{
      writeFile(obj)
    }
  });
}

const writeFile = (obj) =>{
  fs.writeFile(obj['filePath'], obj['data'], function (err,data) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`Downloaded and saved ${obj['length']} bytes to ${obj['filePath']}`);
    }
  });
}
