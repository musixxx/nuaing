const axios = require('axios')

class MediaController {

    static async searchMedia(req, res){
        try {
            console.log(req.query.q);
            let response = await axios({
                url : `https://api.deezer.com/search?q="${req.query.q}"`
            })
            console.log('data: ', response.data.data[0].artist);
            let result = {}
            
            let details = response.data.data[0].artist
            result.detail = details

            let tracks = await axios({
                url : `https://api.deezer.com/artist/${details.id}/top?limit=5%index=5`,
                method : 'GET'
            })
            
            // console.log(tracks.data);
            let arr = []

            let arrayTracks = tracks.data.data
            console.log('arrayTracks: ', arrayTracks);

            

            arrayTracks.forEach(element => {
                arr.push(element.preview)
            });

            console.log(arr);

            result.tracklist = arr

            res.status(200).json(result)


        } catch(err){
            next(err)
        }
    }

}

module.exports =  MediaController

