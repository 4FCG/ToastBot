const checkrole = function(command, msg, connection, role) {
  let query = 'SELECT `' + command + '` FROM `bot_test`.`' + msg.guild.id + '` WHERE `roles` = "' + role + '";';
  let pack = new Promise(function(resolve, reject) {
    connection.query(query, function(err, result){
      if(err || result.length === 0){resolve("error");}
      else if (result) {
        if (result[0][command] === 1) {resolve(true);}
        else {resolve(false);}
      }
    });
  });
  return pack;
}
module.exports = {
    func: (com, message, con, roles) => {
      com = com.match(/^[^'"`;]+$/g);
      if (!roles) {
        let packager = [];
        message.member.roles.array().forEach(function(r) {
          packager.push(checkrole(com, message, con, r.name.match(/^[^'"`;]+$/g)));
        });
        return packager;
      }
      else {
        return checkrole(com, message, con, roles.match(/^[^'"`;]+$/g));
      }
      message.delete();
    }
}
