import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

function Detail() {
	const param = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const members = useSelector((state) => state.memberReducer.members);

	const handleDelete = () => {
		const result = window.confirm('정말로 삭제하시겠습니까? ');
		if (!result) return;
		axios.post('/api/community/delete', { dataNum: param.num }).then((res) => {
			console.log(res);
		});
		navigate('/list');
	};
	useEffect(() => {
		axios.post('/api/community/read').then((res) => {
			setData(res.data.list);
		});
	}, []);
	useEffect(() => {
		if (data.length) {
			axios.post('/api/community/edit', {
				title: data[param.num].title,
				dataNum: param.num,
			});
		}
	}, [data]);

	return (
		<Layout>
			<div className='detail'>
				<div className='detail-box'>
					{data.length && (
						<>
							<p>{data[param.num].title}</p>
							<p>{data[param.num].comment}</p>
						</>
					)}
				</div>
				<ul>
					<li>
						{members ? <Link to={`/Edit/${param.num}`}>수정</Link> : null}
					</li>
					<li>
						<button
							onClick={() =>
								members
									? handleDelete()
									: alert('회원만 이용가능한 기능입니다. 로그인해 주세요')
							}>
							삭제
						</button>
					</li>
				</ul>
			</div>
		</Layout>
	);
}

export default Detail;
