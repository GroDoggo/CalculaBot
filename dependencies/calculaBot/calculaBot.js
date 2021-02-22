const Discord = require("discord.js")
const client = new Discord.Client();
const channel = "811976160425672726"

var actuel = 0
var prec = "000000"
var prec2 = "000000"
var best = 0
var encour = false

var yonis = false

client.on('ready', () => {
    console.log(`[CalculaBot] : Logged in as ${client.user.tag}!`);
    client.user.setActivity(`des chiffres (max : ${best})`, { type: "WATCHING" })
});

client.on('message', msg => {
    if (msg.channel.id === channel && !msg.author.bot) {
        if (msg.content === '0') {
            actuel = 0
            prec = msg.author.id
            prec2 = "0000000"
            msg.react('🏁')
            encour = true
        } else if (msg.content === "yonis") {
            yonis = yonis ? false : true
            console.log("[CalculaBot] : yonis : " + yonis)
            msg.delete()
        } else if (yonis && msg.author.id === "520151596710101003"){
            actuel = actuel + 1
        } else if (encour){
            try {
                const proposition = parseInt(msg.content)
                if (proposition === actuel + 1 && !(msg.author.id === prec) && !(msg.author.id === prec2)) {
                    actuel = actuel + 1
                    prec2 = prec
                    prec = msg.author.id
                } else {
                    msg.channel.send("Perdu, vous avez atteint le score de " + actuel)
                    if (actuel > best) {
                        msg.channel.send("Vous avez battu votre record")
                        best = actuel
                    }
                    actuel = -1
                    encour = false
                    prec = "0000000"
                    prec2 = "0000000"
                    client.user.setActivity(`des chiffres (max : ${best})`, { type: "WATCHING" })
                }
            } catch (error) {
                msg.channel.send("Perdu, vous avez atteint le score de " + actuel)
                if (actuel > best) {
                    msg.channel.send("Vous avez battu votre record")
                    best = actuel
                }
                actuel = -1
                encour = false
                prec = "0000000"
                prec2 = "00000000"
                client.user.setActivity(`des chiffres (max : ${best})`, { type: "WATCHING" })
            }
        }
    }
})

const login = (token) => {
    client.login(token);
};

exports.login = login