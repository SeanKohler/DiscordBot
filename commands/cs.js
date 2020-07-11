module.exports = {
    name: 'cs',
    description: '(PERSONAL USE COMMAND)This command is custom for my friend Logan',
    execute(message, args, play){
        play(message, 'hello darkness my old friend');
    }
}