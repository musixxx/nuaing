const axios = require('axios')

class MediaController {

    static async searchMedia(req, res){
        try {
            console.log(req.query.q);
            let {data} = await axios({
                url : `https://api.deezer.com/search?q=${req.query.q}`
            })
            console.log('data: ', data);
            res.status(200).json(data)

        } catch(err){
            next(err)
        }
    }

}

module.exports =  MediaController

