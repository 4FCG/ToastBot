const google = require("google");
google.resultsPerPage = 10;
module.exports = {
    Description: 'Googles for the given argument',
    Usage: 'google,|argument|',
    func: (client, msg, args) => {
      google(args[0], function (err, res){
        if (err) {console.error(err);}
        var link = res.links[0];
        var counter = 0;
        while (link.title.startsWith("News for") || link.title.startsWith("Images for") || link.title.length < 1 || link.description.length < 1) {
          counter = counter + 1;
          link = res.links[counter];
          if (counter > res.links.length) {return msg.reply("Search failed.");}
        }

        let searchResults = new client.Discord.RichEmbed()
          .setTitle(link.title)
          .setDescription(link.description)
          .setThumbnail("http://i.imgur.com/G3xbXI5.png")
          .setColor("#FF0000")
          .setURL(link.href)
          .setImage(link.href)
          .setFooter('Googling is a difficult to master skill.');
          msg.channel.send({embed: searchResults});
      })
      msg.delete();
    }
}
