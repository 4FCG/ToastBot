const urban = require('relevant-urban');
module.exports = {
    Description: 'Do a search on urban dictionary.',
    Usage: 'urban,|word| OR |random|',
    func: (client, msg, args) => {
      let result = new Promise((resolve,reject) => {
        if (args[0] !== 'random') {
          resolve(
            urban(args[0])
            .then(res => {
              return res;
            }));
        }
        else {
          resolve(
            urban.random()
            .then(res => {
              return res;
            }));
        }
      });
      result.then(r => {
        if (r.definition.length > 1024) {r.definition = "A definition so long it had to be removed."}
        if (r.example.length > 1024) {r.example = "An example so long it had to be removed."}
        let searchResults = new client.Discord.RichEmbed()
          .setTitle('Urban Dictionary')
          .addField("Word", r.word)
          .addField("Definition", r.definition)
          .addField("Example", r.example)
          .setThumbnail("http://www.userlogos.org/files/logos/Ixodides/ud.png")
          .setColor("#FF0000")
          .setURL(r.urbanURL)
          .addField("👍: ", r.thumbsUp, true)
          .addField("👎: ", r.thumbsDown, true)
          .setFooter('Posted by ' + r.author);
          msg.channel.send({embed: searchResults});
      });
      msg.delete();
    }
}
