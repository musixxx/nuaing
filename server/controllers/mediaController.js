const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node')

// const spotify = new spotifyWebAPI()

var spotify = new SpotifyWebApi({
    clientId: '881d110a4f024e9ab7f1342ddeb84554',
    clientSecret: '263e57667d3e49a7a31ae45e853434be'
  });


class MediaController {

    static async searchMedia(req, res, next){
        try {
            
            let data = await spotify.searchTracks(`artist:${req.query.q}`)

            console.log('data: ', data);

            res.send(data)

        } catch (error) {

            res.send(error)
            console.log('error: ', error);
            
        }
    }

}

module.exports =  MediaController