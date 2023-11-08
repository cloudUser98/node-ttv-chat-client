import * as net from "net";
import * as util from "util";
const config = require("../config");

const token = config.accessToken;

const passMsg = "PASS oauth:" + token;
const nickMsg = "NICK " + token;
const channel = "#ezpi89";
var socketClient = net.createConnection({host: "irc.chat.twitch.tv", port: 6667});
// socketClient.setEncoding('ascii'); // The server response is ascii encoded
// socketClient.setNoDelay();
// socketClient.pipe(process.stdout)


socketClient.on("connect", () => {
    console.log("SERVER CONNECTION: SUCCESS") 
});


//socketClient.on("lookup", (err, address, family, host) => console.log("LOOKUP -> ", err, address, family, host));


socketClient.on("data", (data) => {
    // console.log("Data: ", data);
    const dataString = data.toString("ascii");
    if (dataString.includes("PRIVMSG")) {
        const initialIndex = dataString.indexOf("PRIVMSG");
        const messageData = dataString.slice(initialIndex);
        console.log(messageData);
    } else {
        console.log(dataString);
    }
});


socketClient.on("timeout", () => {
    console.log("SOCKET CONNECTION TIMED OUT")
});


socketClient.on("close", (hadError) => {
    console.log(`CLOSING SOCKET CONNECTION ${hadError ? "DUE TO AN ERROR" : ""}`)
});


socketClient.on("ready", () => {
    const requirements = ":twitch.tv/tags twitch.tv/commands";
    const message = util.format('CAP REQ %s\n', requirements);
    socketClient.write(message);
    socketClient.write(passMsg + "\n");
    socketClient.write(nickMsg + "\n");
    setTimeout(function() {
        socketClient.write(`JOIN ${channel}`  + "\n");
    }, 5000);
});
