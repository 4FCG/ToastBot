module.exports = {
    Description: 'Have the magic 8ball answer your question.',
    Usage: '8ball,|question|',
    func: (client, msg, args) => {
      if(args[0]){
        var answers = ["Yes", "No", "Probably", "Probably not", "Certainly", "Impossible"];
        let embedAns = new client.Discord.RichEmbed()
          .setTitle("8Ball:")
          .setThumbnail("http://i.imgur.com/jnTwDkw.png")
          .setColor("#FF0000")
          .addField("Question:", args[0], true)
          .addField("Answer:", answers[Math.floor(Math.random() * answers.length)], true);
        msg.channel.send({embed: embedAns});
      }
      msg.delete(50);
    }
}
