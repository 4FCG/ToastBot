const fs = require('fs');
const osu = require('osu-call');
module.exports = {
    Description: 'Displays general osu stats of the username given.',
    Usage: 'osustats,|username|',
    func: (client, msg, args) => {
      osu.give_key(client.config.osutoken);
      if (args[0]) {
        osu.get_user({u: args[0]})
        .then(result => {
          osu.get_user_best({u: args[0]})
          .then(topplays => {
                var plays = [];
                var pp = [];
                for (let i = 0; i < 4; i++) {
                  let packager = new Promise((resolve,reject) => {
                    resolve(
                      osu.get_beatmaps({b: topplays[i].beatmap_id})
                      .then(map => {
                        return map[0].title;
                      }));
                  });
                  plays.push(packager);
                  pp.push(topplays[i].pp);
                }
                Promise.all(plays)
                .then(values => {
                  fs.readFile('bg2.png', (err, bgpica) => {
                    if (err) throw err;
                    const Canvas = require('canvas')
                      Image = Canvas.Image,
                      canvas = new Canvas(510, 150),
                      ctx = canvas.getContext('2d');
                    let bg = new Image
                    bg.src = bgpica;
                    ctx.drawImage(bg,0,0);
                    ctx.font = '15pt Impact';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'left';
                    ctx.fillText(result[0].username, 15, 30);
                    let userleng = ctx.measureText(result[0].username);
                    ctx.fillRect(15, 32, userleng.width, 2);
                    ctx.fillText("Top Plays", 200, 30);
                    let playleng = ctx.measureText("Top Plays");
                    ctx.fillRect(200, 32, playleng.width, 2);
                    ctx.font = '15px Impact';
                    ctx.fillText("Rank: #" + result[0].pp_rank, 15, 57);
                    ctx.fillText("PP: " + Math.round(result[0].pp_raw), 15, 82);
                    ctx.fillText("Playcount: " + result[0].playcount, 15, 107);
                    ctx.fillText("Accuracy: " + (Math.round(result[0].accuracy * 10)/10) + "%", 15, 132);
                    for (let c = 0; c < 4; c++) {
                      ctx.fillText(values[c],200,57 + (c*25));
                      ctx.fillText(Math.round(pp[c]) + "PP",450,57 + (c*25));
                    }
                    msg.channel.sendFile(canvas.toBuffer(undefined, 3, canvas.PNG_FILTER_NONE), 'Stats.png');
                    msg.delete();
                  });
                });
          });
        });
      }
      else {
        msg.reply("Enter a username please!");
        msg.delete();
      }
    }
}
