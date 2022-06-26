import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { Link } from 'react-router-dom';

function Search() {
	const [word, setWord] = useState('');
	const IMG_URL = 'https://image.tmdb.org/t/p';
	const keyword = [
		'타이타닉',
		'아바타',
		'인셉션',
		'해리포터',
		'노트북',
		'대부',
		'레옹',
		'노팅힐',
	];
	const [item, setItem] = useState('');
	const [id, setId] = useState(0);
	const [result, setResult] = useState(null);
	const [err, setErr] = useState(false);
	const handleSearch = (e) => {
		e.preventDefault();
		const query = encodeURIComponent(item);
		const key = '629bb7e0a6dd12372d435cad53789c94';
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${query}`;

		//검색 결과 가져오기
		axios
			.get(url)
			.then((res) => {
				setId(res.data.results[0].id);
				setResult(res.data.results);
				setErr(false);
			})
			.catch(() => {
				alert('올바른 검색어를 입력하세요');
				setErr(true);
			});
	};

	useEffect(() => {
		const sendMovie = {
			movieName: item,
			movieId: id,
		};
		//몽고db에 내 검색결과의 첫번째 검색을 담는다
		if (sendMovie.movieName !== '' && sendMovie.movieId !== '') {
			axios.post('/api/movie', sendMovie).then((res) => {
				console.log(res);
			});
		}
	}, [id]);
	return (
		<Layout>
			<h2>영화검색</h2>
			<div>
				<input
					type='text'
					value={item}
					onChange={(e) => setItem(e.target.value)}
					placeholder='검색어를 입력하세요'
					style={{ fontSize: '20px', marginRight: '10px' }}
					className="search-input"
				/>
				<button onClick={handleSearch}>검색</button>
			</div>
			<div className='keyword'>
				<h3>추천검색어</h3>
				<ul>
					{keyword.map((el) => {
						return (
							<li
								onClick={() => {
									setWord(el);
									setItem(el);
								}}>
								{el}
							</li>
						);
					})}
				</ul>
			</div>
			<div className='showBox'>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
					{result && !err ? (
						result.map((item, idx) => {
							if (item.backdrop_path)
								return (
									<Link to={`/MovieDetail/${item.id}`}>
										<ul>
											<li style={{ textAlign: 'center' }}>
												{item.original_title}
											</li>
											<li>
												<img
													src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
													alt=''
												/>
											</li>
										</ul>
									</Link>
								);
						})
					) : (
						<p>검색어가 존재하지 않습니다.</p>
					)}
				</div>
			</div>
		</Layout>
	);
}

export default Search;
