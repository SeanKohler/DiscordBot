module.exports = {
    name: 'defineRole',
    description: 'This command creates the role for the server',
    execute(message){
        guild=message.guild;
        if(guild.roles.cache.some(r => r.name ==="Doctors Assistant")){
            console.log("role exists")
        }else{
        try {
            guild.roles.create({
                data:{
                name:"Doctors Assistant",
                color:"#ce8935",
            },
            reason:"asd",
        });
        } catch (error) {
            console.log(error);
        }
        }
    }
}