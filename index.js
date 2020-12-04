const { getPlaylist } = require("./token.js")
const prompt = require("prompt-sync")()
let name = prompt("Enter playlist ID: ")
getPlaylist(name)