const mxmatch = require('../helpers/musixmatch')

class LyricController {

    static async searchTrackId(req, res, next){
        try {
            let url =  `/track.search?q_artist=${req.query.artist}&q_track=${req.query.track}&apikey=${process.env.MUSIXMATCH_API_KEY}`
            let encoded = encodeURI(url)
            console.log(encoded)
            // console.log('data: ', data.message.body.track_list[0].track.track_id);

            let response =  await mxmatch({
                    url : encoded,
                    method: 'GET'
                })

                let idTrack = response.data.message.body.track_list[0].track.track_id
                    
                url =  `/track.lyrics.get?track_id=${idTrack}&apikey=${process.env.MUSIXMATCH_API_KEY}`
                encoded = encodeURI(url)
                console.log(encoded)
                
                let response2 = await mxmatch({
                    url : encoded,
                    method: 'GET'
                })

                console.log(response2.data.message.body.lyrics.lyrics_body);

                let lyrictResult = response2.data.message.body.lyrics.lyrics_body

                res.status(200).json({lyric : lyrictResult})
        } catch (error) {
            next(error)
        }
        

    }

}

module.exports =  LyricController