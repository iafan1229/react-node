import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from '../firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Main() {
	const shortUrl = 'https://api.themoviedb.org/3/';
	const IMG_URL = 'https://image.tmdb.org/t/p';
	const key = '629bb7e0a6dd12372d435cad53789c94';
	const url = `${shortUrl}movie/popular?api_key=${key}&language=ko-KR`;
	const [movie, setMovie] = useState([]);
	const [recent, setRecent] = useState([]);
	const [arr, setArr] = useState([]);
	const [num, setNum] = useState(4);
	const auth = getAuth();

	//인기 있는 영화 리스트 불러오기
	const init = () => {
		axios.get(url).then((res) => {
			setMovie(res.data.results);
		});
	};
	//최근 검색한 영화 id 몽고DB에서 가져오기
	const getRecent = () => {
		axios.get('/api/movie').then((res) => {
			//console.log(res)
			//console.log(res.data.recentList[0].movieId)
			setRecent(res.data.recentList);
		});
	};

	//최근 검색한 영화들 배열에 담기
	const showRecent = () => {
		let recentUrl;

		const result = recent
			.filter((el) => el.movieId !== 0)
			.map((el, idx) => {
				recentUrl = `https://api.themoviedb.org/3/movie/${el.movieId}?api_key=${key}&language=ko-KR`;
				return axios(recentUrl);
			});

		Promise.all(result).then((item) => {
			setArr(item);
		});

	};
	//영화리스트 불러오고, 최근 검색리스트 불러온다
	useEffect(() => {
		init();
		getRecent();
	}, []);

	//최근검색리스트 보여준다
	useEffect(() => {
		if (recent.length) {
			showRecent();
		}
	}, [recent]);

	//로그인된 아이디값 불러오기
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				console.log(uid);
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);

	const initSlide = () => {
		if(window.innerWidth < 1200 & window.innerWidth > 500) {
			setNum(2)
		}else if(window.innerWidth < 500){
			setNum(1)
		}else {
			setNum(4)
		}
	}
	useEffect(()=>{
		initSlide()
		window.addEventListener('resize', initSlide)
	},[])

	const Container = styled.section`
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-gap: 10px;
		a {
			position: relative;
			width: 100%;
			height: 400px;
			overflow: hidden;
			background: #eee;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.item1 {
			grid-column: 1 / span 2;
		}
		.item6 {
			grid-column: 3 / span 2;
		}
		@media all and (max-width: 650px) {
			grid-template-columns: repeat(1, 1fr);
			grid-template-rows: repeat(4, 1fr);
			.item1 {
				grid-column: 1 / span 4;
			}
			.grid {
				grid-column: auto;
				&.item1, &.item6 {
					grid-column: 1 / span 6;
				}
				&.item2, &.item4 {
					grid-column: 1 / span 2;
				}
				&.item3, &.item5 {
					grid-column: 3 / span 4;
				}
			}
		}
		@media all and (max-width: 500px) {
			grid-template-columns: 1fr;
			.grid {
				&.item1, &.item2, &.item3, &.item4, &.item5, &.item6 {
					grid-column: auto
				}
			}
		}
	`;
	const Title = styled.div`
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		ul {
			padding: 0 10px;
			padding-bottom: 10px;
			color: #fff;
			li:last-child {
				font-size: 12px;
			}
		}
	`;

	return (
		<Layout>
			<main>
				<h2>인기영화 리스트</h2>
				<Container className='container'>
					{movie.length &&
						movie.map((movieItem, idx) => {
							if (idx <= 5)
								return (
									<Link
										to={`/MovieDetail/${movieItem.id}`}
										className={`grid item${idx + 1}`}>
										{idx !== 0 && idx !== 5 ? (
											<img
												src={`${IMG_URL}/w500${movie[idx].poster_path}`}
												alt='이미지'
											/>
										) : (
											<img
												src={`${IMG_URL}/w500${movie[idx].backdrop_path}`}
												alt='이미지'
											/>
										)}
										<Title>
											<ul>
												<li>{movie[idx].title}</li>
												<li>
													{movie[idx].overview.length < 50
														? movie[idx].overview
														: movie[idx].overview.substr(0, 50) + '...'}
												</li>
											</ul>
										</Title>
									</Link>
								);
						})}
				</Container>

				<section className='recent'>
					<h2>최근 검색한 영화들</h2>
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						spaceBetween={20}
						slidesPerView={num}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}>
						{arr.reverse().map((el, idx) => {
							if (idx < 10)
								return (
									<SwiperSlide
										style={{ height: '300px', border: '1px solid #eee' }}>
										<div style={{ overflow: 'hidden' }}>
											{el.data.backdrop_path === null ? (
												<div
													style={{
														height: '300px',
														background: '#eee',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													<p>이미지가 없습니다</p>
												</div>
											) : (
												<img
													src={`https://image.tmdb.org/t/p/w500/${el.data.backdrop_path}`}
													alt=''
													style={{ height: '300px', objectFit: 'cover' }}
												/>
											)}
										</div>
										<div>
											<p>{el.data.title}</p>
										</div>
									</SwiperSlide>
								);
						})}
					</Swiper>
				</section>
			</main>
		</Layout>
	);
}

export default Main;
