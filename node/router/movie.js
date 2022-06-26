const express = require('express');
//라우터 불러오기
const router = express.Router();
const { MovieList } = require('../model/movieSchema');

router.post('/movie', (req, res) => {
	const save = new MovieList({
		movieName: req.body.movieName,
		movieId: req.body.movieId,
	});

	save
		.save()
		.then(() => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			res.status(400).json({ success: false });
		});
});

router.get('/movie', (req, res) => {
	MovieList.find()
		.exec()
		.then((doc) => {
			res.status(200).json({ success: true, recentList: doc });
		});
});
module.exports = router;
