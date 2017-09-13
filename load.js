const fs = require('fs');
module.exports = {
  func: (Client, command) => {
    let comls = fs.readdirSync('./commands/');
    if (comls.indexOf(`${command}.js`) >= 0) {
      delete require.cache[require.resolve(`./commands/${command}.js`)];
      Client.commands[command] = require(`./commands/${command}.js`);
      console.log(`Reloading ${command}.js.`);
    }
    else {
      console.log('Loading commands.');
      for (c = 0; c < comls.length; c++) {
        let com = comls[c];
        if (com.match(/\.js$/)) {
          delete require.cache[require.resolve(`./commands/${com}`)];
          Client.commands[com.slice(0, -3)] = require(`./commands/${com}`);
          console.log(com);
        }
      }
    }
  }
}
