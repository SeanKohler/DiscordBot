module.exports = {
    name: 'ttt',
    description: 'This command gives version data',
    execute(message, args, client) {
        var row1 = ["⬜", "⬜", "⬜"];
        var row2 = ["⬜", "⬜", "⬜"];
        var row3 = ["⬜", "⬜", "⬜"];
        var topL = false;
        var topM = false;
        var topR = false;
        var midL = false;
        var midC = false;
        var midR = false;
        var botL = false;
        var botM = false;
        var botR = false;
        var turns = 0;
        var count = 0;
        reset();
        var X = '❌';
        var O = '🟡';
        var blank = '⬜';
        console.log("|" + row1[0] + "|" + row1[1] + "|" + row1[2] + "|");
        console.log("|-|-|-|");
        console.log("|" + row2[0] + "|" + row2[1] + "|" + row2[2] + "|");
        console.log("|-|-|-|");
        console.log("|" + row3[0] + "|" + row3[1] + "|" + row3[2] + "|");

        if (row1[0] == X || row1[1] == X || row1[2] == X || row2[0] == X || row2[1] == X || row2[2] == X || row3[0] == X || row3[1] == X || row3[2] == X) {
            //Has pieces in it
            reset();
        } else {
            print();
        }


        client.on('messageReactionAdd', function (reaction, user) {
            if (!user.bot) {
                //The following code will only run if the user is not a bot, therefore filering out the initial bot reactions.
                if (reaction._emoji.name == '↖️') {
                    topL = true;
                    row1[0] = X;
                } else if (reaction._emoji.name == '⬆️') {
                    topM = true;
                    row1[1] = X;
                } else if (reaction._emoji.name == '↗️') {
                    topR = true;
                    row1[2] = X;
                } else if (reaction._emoji.name == '⬅️') {
                    midL = true;
                    row2[0] = X;
                } else if (reaction._emoji.name == '🔵') {
                    midC = true;
                    row2[1] = X;
                } else if (reaction._emoji.name == '➡️') {
                    midR = true;
                    row2[2] = X;
                } else if (reaction._emoji.name == '↙️') {
                    botL = true;
                    row3[0] = X;
                } else if (reaction._emoji.name == '⬇️') {
                    botM = true;
                    row3[1] = X;
                } else if (reaction._emoji.name == '↘️') {
                    botR = true;
                    row3[2] = X;
                }
                //row1[0]=reaction.name;
                console.log(reaction._emoji.name);
                var win = botAI();
                if (win == true) {
                    //Do nothing
                    print();
                    reset();
                } else {
                    print();
                }


            }
        });


        function print() {
            count += 1;
            message.channel.bulkDelete(1);
            if (row1[0] == X || row1[1] == X || row1[2] == X || row2[0] == X || row2[1] == X || row2[2] == X || row3[0] == X || row3[1] == X || row3[2] == X) {
                if (count > 5) {
                    message.channel.send("TIE!");
                    reset();
                    //print();   
                }
            }
            message.channel.send(row1[0] + row1[1] + row1[2] + "\n" + row2[0] + row2[1] + row2[2] + "\n" + row3[0] + row3[1] + row3[2]).then(function (message) {
                console.log("|" + row1[0] + "|" + row1[1] + "|" + row1[2] + "|");
                console.log("|-|-|-|");
                console.log("|" + row2[0] + "|" + row2[1] + "|" + row2[2] + "|");
                console.log("|-|-|-|");
                console.log("|" + row3[0] + "|" + row3[1] + "|" + row3[2] + "|");
                if (topL == false) {
                    message.react("↖️");
                }
                if (topM == false) {
                    message.react("⬆️");
                }
                if (topR == false) {
                    message.react("↗️");
                }
                if (midL == false) {
                    message.react("⬅️");
                }
                if (midC == false) {
                    message.react("🔵");
                }
                if (midR == false) {
                    message.react("➡️");
                }
                if (botL == false) {
                    message.react("↙️");
                }
                if (botM == false) {
                    message.react("⬇️");
                }
                if (botR == false) {
                    message.react("↘️");
                }

            })
        }
        function reset() {
            row1 = ["⬜", "⬜", "⬜"];
            row2 = ["⬜", "⬜", "⬜"];
            row3 = ["⬜", "⬜", "⬜"];
            topL = false;
            topM = false;
            topR = false;
            midL = false;
            midC = false;
            midR = false;
            botL = false;
            botM = false;
            botR = false;
            turns = 0;
            count = 0;
        }

        function botAI() {
            var r1x = 0;
            var r2x = 0;
            var r3x = 0;
            var col1 = 0;
            var col2 = 0;
            var col3 = 0;
            for (var i = 0; i < 3; i++) {
                if (row1[i] == X) {
                    if (i == 0) {
                        col1 += 1;
                    } else if (i == 1) {
                        col2 += 1;
                    } else if (i == 2) {
                        col3 += 1;
                    }
                    console.log("X in row 1 at pos: " + i);
                    r1x += 1;
                }
                if (row2[i] == X) {
                    if (i == 0) {
                        col1 += 1;
                    } else if (i == 1) {
                        col2 += 1;
                    } else if (i == 2) {
                        col3 += 1;
                    }
                    console.log("X in row 2 at pos: " + i);
                    r2x += 1;
                }
                if (row3[i] == X) {
                    if (i == 0) {
                        col1 += 1;
                    } else if (i == 1) {
                        col2 += 1;
                    } else if (i == 2) {
                        col3 += 1;
                    }
                    console.log("X in row 3 at pos: " + i);
                    r3x += 1;
                }
            }
            var won = makeMove(r1x, r2x, r3x, col1, col2, col3);
            if (won == true) {
                //reset();
                message.channel.send("I Won!");
                return true;
            }
        }
        function makeMove(r1, r2, r3, c1, c2, c3) {
            if (r1 + r2 + r3 == 1) {
                firstTurn(r1, r2, r3);
            }
            var win = checkAIwin(r1, r2, r3, c1, c2, c3);
            if (win == true) {
                //message.channel.send("I Won!");
                if (row1[0] == blank) {
                    topL = true;
                }
                if (row1[1] == blank) {
                    topM = true;
                }
                if (row1[2] == blank) {
                    topR = true;
                }
                if (row2[0] == blank) {
                    midL = true;
                }
                if (row2[1] == blank) {
                    midC = true;
                }
                if (row2[2] == blank) {
                    midR = true;
                }
                if (row3[0] == blank) {
                    botL = true;
                }
                if (row3[1] == blank) {
                    botM = true;
                }
                if (row3[2] == blank) {
                    botR = true;
                }
                return true;
            }
            if (row1[0] == X) {//check from top left
                if (row1[1] == X) {
                    if (row1[2] == blank) {
                        row1[2] = O;
                        topR = true;
                        return;
                    }
                }
                if (row2[1] == X) {
                    if (row3[2] == blank) {
                        botR = true;
                        row3[2] = O;
                        return;
                    }
                }
                if (row2[0] == X) {
                    if (row3[0] == blank) {
                        botL = true;
                        row3[0] = O;
                        return;
                    }
                }
                if (row3[0] == X) {
                    if (row2[0] == blank) {
                        midL = true;
                        row2[0] = O;
                        return;
                    }
                }
                var check = rowCheck(row1);
                check = rowCheck(row2);
                check = rowCheck(row3);
                // if(check==false){//Row was filled but no winner
                //     console.log('check was false');
                // }


            }//end of top left check
            if (row1[1] == X) {//Start of top Middle Check
                if (row1[0] == X) {
                    if (row1[2] == blank) {
                        topR = true;
                        row1[2] = O;
                        return;
                    }
                }
                if (row1[2] == X) {
                    if (row1[0] == blank) {
                        topL = true;
                        row1[0] = O;
                        return;
                    }
                }
                if (row2[1] == X) {
                    if (row3[1] == blank) {
                        botM = true;
                        row3[1] = O;
                        return;
                    }
                }
                check = rowCheck(row1);
                check = rowCheck(row2);
                check = rowCheck(row3);
            }//end of top mid check
            if (row1[2] == X) {//Start of top Left check
                if (row1[1] == X) {
                    if (row1[0] == blank) {
                        topL = true;
                        row1[0] = O;
                        return;
                    }
                }
                if (row1[0] == X) {
                    if (row1[1] == blank) {
                        topM = true;
                        row1[1] = O;
                        return;
                    }
                }
                if (row2[2] == X) {
                    if (row3[2] == blank) {
                        botR = true;
                        row3[2] = O;
                        return;
                    }
                }
                if (row3[2] == X) {
                    if (row2[2] == blank) {
                        midR = true;
                        row2[2] = O;
                        return;
                    }
                }
                if (row2[1] == X) {
                    if (row3[0] == blank) {
                        botL = true;
                        row3[0] = O;
                        return;
                    }
                }
                if (row3[0] == X) {
                    if (row2[1] == blank) {
                        midC = true;
                        row2[1] = O;
                        return;
                    }
                }
            }//end of top left check
            check = rowCheck(row1);
            check = rowCheck(row2);
            check = rowCheck(row3);

        }
        function firstTurn(r1x, r2x, r3x) {
            if (turns == 0) {
                if (row2[1] == '⬜') {
                    midC = true;
                    row2[1] = O;
                    turns += 1;
                } else {
                    if (r1x > 0) {
                        if (row1[1] != X) {
                            if (row1[1] == blank) {
                                topM = true;
                                row1[1] = O;
                            }
                        } else {
                            if (row1[0] != X) {
                                if (row1[0] == blank) {
                                    topL = true;
                                    row1[0] = O;
                                }
                            }
                        }
                    } else if (r2x > 0) {
                        if (row2[2] != X) {
                            if (row2[2] == blank) {
                                midR = true;
                                row2[2] = O;
                            }
                        } else {
                            if (row2[0] != X) {
                                if (row2[0] == blank) {
                                    midL = true;
                                    row2[0] = O;
                                }
                            }
                        }

                    } else if (r3x > 0) {
                        if (row3[1] != X) {
                            if (row3[1] == blank) {
                                botM = true;
                                row3[1] = O;
                            }
                        } else {
                            if (row3[0] != X) {
                                if (row3[0] == blank) {
                                    botL = true;
                                    row3[0] = O;
                                }
                            }
                        }

                    }
                }
            }
        }
        function rowCheck(i) {
            if (i[0] == X && i[1] == X && i[2] == X) {
                message.channel.send("You Won!");
                return true;
            } else {
                return false;
            }
        }
        function checkAIwin() {
            var r1 = 0;
            var r2 = 0;
            var r3 = 0;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            for (var i = 0; i < 3; i++) {
                if (row1[i] == O) {
                    if (i == 0) {
                        c1 += 1;
                    } else if (i == 1) {
                        c2 += 1;
                    } else if (i == 2) {
                        c3 += 1;
                    }
                    r1 += 1;
                }
                if (row2[i] == O) {
                    if (i == 0) {
                        c1 += 1;
                    } else if (i == 1) {
                        c2 += 1;
                    } else if (i == 2) {
                        c3 += 1;
                    }
                    r2 += 1;
                }
                if (row3[i] == O) {
                    if (i == 0) {
                        c1 += 1;
                    } else if (i == 1) {
                        c2 += 1;
                    } else if (i == 2) {
                        c3 += 1;
                    }
                    r3 += 1;
                }
            }
            console.log("r1:" + r1);
            console.log("r2:" + r2);
            console.log("r3:" + r3);
            console.log("c1:" + c1);
            console.log("c2:" + c2);
            console.log("c3:" + c3);
            if (r1 == 2) {//checking rows
                if (row1[0] == blank) {
                    topL = true;
                    row1[0] = O;
                    return true;
                } else if (row1[1] == blank) {
                    topM = true;
                    row1[1] = O;
                    return true;
                } else if (row1[2] == blank) {
                    topR = true;
                    row1[2] = O;
                    return true;
                }
            } else if (r2 == 2) {
                if (row2[0] == blank) {
                    midL = true;
                    row2[0] = O;
                    return true;
                } else if (row2[1] == blank) {
                    midC = true;
                    row2[1] = O;
                    return true;
                } else if (row2[2] == blank) {
                    midR = true;
                    row2[2] = O;
                    return true;
                }
            } else if (r3 == 2) {
                if (row3[0] == blank) {
                    botL = true;
                    row3[0] = O;
                    return true;
                } else if (row3[1] == blank) {
                    botM = true;
                    row3[1] = O;
                    return true;
                } else if (row3[2] == blank) {
                    botR = true;
                    row3[2] = O;
                    return true;
                }
            }//end of checking rows
            if (c1 == 2) {//check cols
                if (row1[0] == blank) {
                    topL = true;
                    row1[0] = O;
                    return true;
                } else if (row2[0] == blank) {
                    midL = true;
                    row2[0] = O;
                    return true;
                } else if (row3[0] == blank) {
                    botL = true;
                    row3[0] = O;
                    return true;
                }
            } else if (c2 == 2) {
                if (row1[1] == blank) {
                    topM = true;
                    row1[1] = O;
                    return true;
                } else if (row2[1] == blank) {
                    midC = true;
                    row2[1] = O;
                    return true;
                } else if (row3[1] == blank) {
                    botM = true;
                    row3[1] = O;
                    return true;
                }
            } else if (c3 == 2) {
                if (row1[2] == blank) {
                    topR = true;
                    row1[2] = O;
                    return true;
                } else if (row2[2] == blank) {
                    midR = true;
                    row2[2] = O;
                    return true;
                } else if (row3[2] == blank) {
                    botR = true;
                    row3[2] = O;
                    return true;
                }
            }//end of cols check
            if (row1[0] == O && row2[1] == O) {//checking left diag
                if (row3[2] == blank) {
                    botR = true;
                    row3[2] = O;
                    return true;
                }
            } else if (row2[1] == O && row3[2] == O) {
                if (row1[0] == blank) {
                    topL = true;
                    row1[0] = O;
                    return true;
                }
            } else if (row1[0] == O && row3[2] == O) {
                if (row2[1] == blank) {
                    midC = true;
                    row2[1] = O;
                    return true;
                }
            }//end left diag check
            if (row1[2] == O && row2[1] == O) {//check right diag
                if (row3[0] == blank) {
                    botL = true;
                    row3[0] = O;
                    return true;
                }
            } else if (row2[1] == O && row3[0] == O) {
                if (row1[2] == blank) {
                    topR = true;
                    row1[2] = O;
                    return true;
                }
            } else if (row1[2] == O && row3[0] == O) {
                if (row2[1] == blank) {
                    midC = true;
                    row2[1] = O;
                    return true;
                }
            }//end right diag check
        }
    }
}
