const fs = require('fs');
const util = require('util')

// promises
const readsFile = util.promisify(fs.readFile);

// writes to a file
const writesFile = (location, note) =>
    fs.writeFile(location, JSON.stringify(note, null, 3), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${location}`)
    );

// reading than writing so you can add more notes like we did in module 22 
const both = (note, location) => {
    fs.readFile(location, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const datas = JSON.parse(data);
            datas.push(note);
            writesFile(location, datas);
        }
    });
};


module.exports = { readsFile, writesFile, both};