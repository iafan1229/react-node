import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';

function List() {
	const navigate = useNavigate();
	const [list, setList] = useState([]);
	useEffect(() => {
		axios.post('/api/community/read').then((res) => {
			setList(res.data.list);
		});
	}, []);
	return (
		<Layout>
			<h2>메모리스트</h2>
			{list.length &&
				list.map((text, idx) => {
					return (
						<Link to={`/List/${idx}`}>
							<ul className='list' key={idx}>
								<li>{text.title}</li>
								<li>{text.comment}</li>
							</ul>
						</Link>
					);
				})}
			<button onClick={() => navigate('/')}>메인으로 가기</button>
		</Layout>
	);
}

export default List;
