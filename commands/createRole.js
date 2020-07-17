module.exports = {
    name: 'createRole',
    description: 'This command creates the role for the server',
    execute(message, str) {
        if (str == undefined) {
            message.channel.send("Cant create a role without a name")
        } else {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                if (guild.roles.cache.some(r => r.name === str)) {
                    //DO NOTHING ROLE EXISTS
                } else {
                    if (!str) {
                        message.channel.send("Cant create a role without a name")
                    } else {
                        guild = message.guild;
                        if (guild.roles.cache.some(r => r.name === str)) {
                            console.log("role exists")
                        } else {
                            try {
                                hue = getRandomColor();
                                guild.roles.create({
                                    data: {
                                        name: str,
                                        color: hue,
                                        //#ce8935
                                    },
                                    reason: message.author.username + " Created this role",
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                }
            } else {
                message.channel.send("You dont have permission for this command")
            }
        }
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
