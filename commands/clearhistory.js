module.exports = {
    name: 'clearhistory',
    description: 'This command clears the history.txt file',
    execute(message, args){
        const fs = require('fs');
        var catalog;
            fs.readFile('histlog.txt', 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                catalog=data;
            fs.appendFile('catalog.txt', catalog, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              catalog="";
            fs.writeFile('histlog.txt', catalog, function (err) {
                if (err) throw err;
              });
              });
    }
}