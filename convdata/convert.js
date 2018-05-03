const csv=require('csvtojson');
const fs = require('fs');

// data from https://github.com/zhengda/callliwei/tree/master/data
const CSV_FILE_PATH='t9a.h2.csv';
const MEANINGFUL = ['picurl', 'name', 'ename', 'party', 'committee', 'alltel', 'email', 'alladdr', 'facebook', 'lineid'];

// from CSV to JSON
let dataset = [];

csv()
  .fromFile(CSV_FILE_PATH)
  .on('json', (jsonObj) => {
    dataset.push({
      name: jsonObj.name,
      party: jsonObj.party,
      committee: jsonObj.committee,
      email: jsonObj.email,
      facebook: jsonObj.facebook,
      lineid: jsonObj.lineid,
      picurl: jsonObj,
    });
  })
  .on('done', (error) => {
    fs.writeFile('./liwei.json', JSON.stringify(dataset) , 'utf-8');
  });
