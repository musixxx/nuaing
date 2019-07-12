const router = require('express').Router()

const EventController = require('../controllers/eventController')
const MediaController = require('../controllers/mediaController')
const LyricController = require('../controllers/lyricController')

router.get('/events', EventController.getEvent)
router.get('/events/search', EventController.searchEvent)

router.get('/media', MediaController.searchMedia)

// router.get('/lyrics', LyricController.searchLyric)
router.get('/lyrics/tracks', LyricController.searchTrackId)

module.exports = router