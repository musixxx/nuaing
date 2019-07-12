const mxmatch = require('../helpers/musixmatch')

class LyricController {

    static searchTrackId(req, res, next){
        let url =  `/track.search?q_artist=${req.query.artist}&q_track=${req.query.track}&apikey=${process.env.MUSIXMATCH_API_KEY}`
        let encoded = encodeURI(url)
        console.log(encoded)

            mxmatch({
                url : encoded,
                method: 'GET'
            })
                .then(({ data }) => {
                    console.log('data: ', data);
                    
                    res.status(200).json(data)
                })
                .catch(next)
    }

    static searchLyric(req, res, next){
        let url =  `/track.lyrics.get?track_id=${req.query.id}&apikey=${process.env.MUSIXMATCH_API_KEY}`
        let encoded = encodeURI(url)
        console.log(encoded)
            mxmatch({
                url : encoded,
                method: 'GET'
            })
                .then(({ data }) => {
                    console.log('data: ', data.message.body);
                    
                    res.status(200).json(data)
                })
                .catch(next)
    }
}

module.exports =  LyricController