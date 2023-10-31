import * as net from "net";


console.log("Start")
var client = net.connect({host: "irc.chat.twitch.tv", port: 6667})
client.pipe(process.stdout)
