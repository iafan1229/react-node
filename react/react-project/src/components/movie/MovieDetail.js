import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { Link, useNavigate } from 'react-router-dom';

function MovieDetail() {
	const navi = useNavigate();
	const params = useParams();
	const [item, setItem] = useState({});
	//디테일 페이지
	const key = '629bb7e0a6dd12372d435cad53789c94';

	useEffect(() => {
		const goDetail = `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${key}&language=ko-KR`;
		axios.get(goDetail).then((res) => {
			setItem(res.data);
		});
	}, []);

	useEffect(() => {
		const items = [
			item.poster_path,
			item.title,
			item.tagline,
			item.genres,
			item.homepage,
			item.release_date,
		];
		Object.keys(item).length && console.log(item);
	}, [item]);

	return (
		<Layout>
			<div className='movie-detail'>
				{Object.keys(item).length && (
					<>
						<div>
							<div>
								<img
									src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
									alt=''
								/>
							</div>
						</div>
						<div className='content'>
							<table className='pc-table'>
								<tbody>
									<tr>
										<th>제목</th>
										<td>{item.title}</td>
										<th>줄거리</th>
										<td>{item.tagline}</td>
									</tr>
									<tr>
										<th>장르</th>
										<td>
											<ul>
												{item.genres.map((el, idx) => {
													return <li>{el.name}</li>;
												})}
											</ul>
										</td>
										<th>홈페이지</th>
										<td>{item.homepage}</td>
									</tr>
									<tr>
										<th>개봉일</th>
										<td>{item.release_date}</td>
										<th>인기</th>
										<td>{item.popularity}</td>
									</tr>
								</tbody>
							</table>
							<table className='mobile-table'>
								<tbody>
									<tr>
										<th>제목</th>
										<td>{item.title}</td>
									</tr>
									<tr>
										<th>줄거리</th>
										<td>{item.tagline}</td>
									</tr>
									<tr>
										<th>장르</th>
										<td>
											<ul>
												{item.genres.map((el, idx) => {
													return <li>{el.name}</li>;
												})}
											</ul>
										</td>
									</tr>
									<tr>
										<th>홈페이지</th>
										<td>{item.homepage}</td>
									</tr>
									<tr>
										<th>개봉일</th>
										<td>{item.release_date}</td>
									</tr>
									<tr>
										<th>인기</th>
										<td>{item.popularity}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
			<div>
				<button className='back' onClick={() => navi(-1)}>뒤로가기</button>
			</div>
		</Layout>
	);
}

export default MovieDetail;
