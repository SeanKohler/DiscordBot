module.exports = {
    name: 'embed',
    description: 'This command creates an embed about the user that typed the command',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
            .setColor(0x25FA34)
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("User Information")
            .setDescription("Player Name: "+ message.author.username)
            .addFields(
                { name: "Current Server: ", value: message.guild.name },
                { name: "Roles: ", value: message.member.roles.highest.name })
                
            //message.member.roles
            //.addField("Version: "+version)
            //.addField("Current Server: "+message.guild.name,);
            message.channel.send(embed);
    }
}