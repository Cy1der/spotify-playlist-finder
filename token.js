const spotify = require('spotify-web-api-node')
const keyv = require('keyv')
const DB = new keyv("sqlite://token.sqlite", { namespace: 'spotifyToken' })

const api = new spotify({
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    redirectUri: "https://localhost:8888/callback"
})

module.exports = {
    async getPlaylist(ID) {
        let savedToken = await DB.get("TOKEN")
        let success
        
        if (!savedToken) {
            await api.clientCredentialsGrant().then(
                async function(data) {
                    token = data.body["access_token"]
                    expiresIn = data.body["expires_in"]
                    console.log('Generated new token\nThe access token expires in ' + expiresIn + ' seconds\nThe access token is ' + token);

                    api.setAccessToken(token)
                    await DB.set("TOKEN", `${token}`, ((parseInt(expiresIn) * 1000) - (60 * 1000)))
                    success = true
                },
                function(err) {
                    console.log('Something went wrong when retrieving an access token', err.message);
                    success = false;
                }
            )
        } else {
            api.setAccessToken(savedToken);
            success = true;
        }

        if (success) {
            let alldata
            let songQueries = [];

            await api.getPlaylist(ID).then(function(data) {
                alldata = data.body

                let items = alldata.tracks.items
                let str = ''

                for (let i = 0; i < items.length; i++) {
                    let artists = []
                    for (let j = 0; j < items[i].track.artists.length; j++) {
                        artists.push(items[i].track.artists[j].name)
                    }
                    str += items[i].track.name + " by " + artists.join(", ") + "\n" 
                }
                console.log(str)
                console.log(items.length + " songs loaded, max is 100 at once.")
            }, function(err) {
                if (err.statusCode == 404) return;
                else console.log('Something went wrong!', err);
            })

            if (!songQueries[0]) return false
            data = {
                songQueries: songQueries,
                name: `${alldata.name}`,
                url: alldata.external_urls.spotify
            }
            return data
        }
        else return false
    }
}