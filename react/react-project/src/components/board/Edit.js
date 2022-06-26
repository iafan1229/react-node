import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';

function Edit() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [title, setTitle] = useState('');
	const [comment, setComment] = useState('');

	const param = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		const tmp = {
			title,
			comment,
			dataNum: param.num,
		};
		console.log(tmp);
		axios.post('/api/community/update', tmp).then((res) => {
			if (res) {
				alert('데이터 저장에 성공했습니다');
				console.log(res);
			}
		});
		navigate('/list');
	};

	useEffect(() => {
		axios.post('/api/community/read').then((res) => {
			setData(res.data.list[param.num]);
		});
	}, []);

	useEffect(() => {
		setTitle(data.title);
		setComment(data.comment);
	}, [data]);

	return (
		<Layout>
			<form className='board-write' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>제목</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='comment'>내용</label>
					<textarea
						name=''
						id='comment'
						cols='30'
						rows='10'
						value={comment}
						onChange={(e) => setComment(e.target.value)}></textarea>
				</div>
				<div>
					<input type='submit' value='제출' />
					<button
						style={{ marginTop: '30px' }}
						onClick={() => navigate(`/List/${param.num}`)}>
						뒤로가기
					</button>
				</div>
			</form>
		</Layout>
	);
}

export default Edit;
