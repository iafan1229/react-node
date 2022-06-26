const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

app.use(express.static(path.join(__dirname, '../react/react-project/build/')));

//클라이언트에서 보내는 메시지를 분석(body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	mongoose
		.connect(
			'mongodb+srv://iafan1229:900103@cluster0.hne5f.mongodb.net/hydev?retryWrites=true&w=majority'
		)
		.then(() => {
			console.log('listening to port : ' + port);
			console.log('mongoDB connected');
		});
});
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/react-project/build/index.html'));
});

//전용 라우터 호출
app.use('/api/community', require('./router/community.js'));

app.use('/api', require('./router/movie.js'));
