const versiontxt = "Version: 1.4.3"
const desc ="Seperated !info into !v"
module.exports = {
    name: 'v',
    description: 'This command gives version data',
    execute(message, args){
        message.channel.send(versiontxt+"\n"+desc);
    }
}