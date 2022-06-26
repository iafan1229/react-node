import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';

function Write() {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [comment, setComment] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			title,
			comment,
		};
		axios.post('/api/community/write', data).then((res) => {
			if (res) {
				alert('데이터 저장에 성공했습니다');
				console.log(res);
			}
		});
		navigate('/');
	};

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
				</div>
			</form>
		</Layout>
	);
}

export default Write;
