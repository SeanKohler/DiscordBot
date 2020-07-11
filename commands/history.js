module.exports = {
    name: 'history',
    description: 'This command prints out the play history',
    execute(message, args){
      const fs = require('fs');
        fs.readFile('histlog.txt', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
            message.channel.send(data);
          });
    }
}