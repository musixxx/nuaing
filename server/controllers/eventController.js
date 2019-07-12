const axios = require('axios')
// Token in dot env
const Url = axios.create({
	baseURL: 'https://api.songkick.com/api/3.0',
});

class EventController {
	
	static getEvent(req, res, next){
		// console.log(process.env.PREDICTHQ_ACCESS_TOKEN);
		Url.get(`/events.json?apikey=${process.env.SONGKICK_TOKEN}&location=sk:29154&type=Concert&page=1&per_page=6`)
		.then(({ data }) => {
			console.log(data.resultsPage.results.event);
			console.log('controller oke');
			res.status(200).json({
				data : data.resultsPage.results.event,
			})
		})
		.catch((err) => {
			res.status(500).json({
				error : err,
				message : 'Internal Server Error'
			})
		})
	}

	static searchEvent(req, res, next){

	}

}

module.exports =  EventController