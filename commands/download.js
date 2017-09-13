const fs = require('fs');
const snekfetch = require('snekfetch');
module.exports = {
    Description: 'Downloads given amount of images found in the last 100 messages.',
    Usage: 'download,|number|',
    func: (client, msg, args) => {
      if (!args[0]) {return console.log('No argument given.');}

      msg.channel.fetchMessages({limit: 100})
        .then(messages => {
          let images = [];
          messages.array().forEach(function(mesg) {
            if (typeof mesg.embeds[0] !== "undefined") {
              images.push(mesg.embeds[0].url);
            }
            else if (typeof mesg.attachments.first() !== "undefined") {
              images.push(mesg.attachments.first().url);
            }
          });
          let date = new Date();
          let time = date.getTime();
          if (args[0] > images.length) {
            args[0] = images.length;
            console.log(`Only ${images.length} images found.`);
          }
          fs.mkdir(`${client.config.dlPath}/${time}`, (err) => {
            if (err) throw err;
            for (let c = 0; c < args[0]; c++) {
              snekfetch.get(images[c])
              .then(pic => {
                fs.writeFile(`${client.config.dlPath}/${time}/${c}.png`, pic.body, (err) => {
                  if (err) throw err;
                });
              });
            }
          });
        });
      msg.delete();
    }
}
