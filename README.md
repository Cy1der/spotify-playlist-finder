# Spotify Playlist Finder
Finds all the songs in a playlist found in spotify

```
    **Requirements:**
        Node.js installed (https://nodejs.org/en/download/)
        Spotify app credentials: (https://developer.spotify.com/)
            Client ID
            Client Secret
            Redirect URI set to https://localhost:8888/callback
```

To get started, run the following command in the root directory's command line and create a file named "token.sqlite": `npm install`
To run the "app", run the following command: `node .`

Enter playlist ID and it will print out the first 100 songs (if there is 100+, if not it will print all the songs).

Any issues? DM ${Cy1der}#0001 in Discord