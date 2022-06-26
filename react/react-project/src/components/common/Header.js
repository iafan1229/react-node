import { Link, NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import firebase from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const auth = getAuth();

function Header() {
	const location = useLocation()
	const path = process.env.PUBLIC_URL;
	const navi = useNavigate();
	const dispatch = useDispatch();
	const members = useSelector(
		(state) => state.memberReducer.members
	);
	const style = { backgroundColor: 'red', transition: 'backgroundColor 0.3s' };
	const [toggle, setToggle] = useState(false)
	const moGnb = useRef(null)
	const [gnb, setGnb] = useState(`url(${path}/img/menu2.png)`);

	const isReach = function () {
		if (members) {
			return '/write';
		} else {
			alert('글쓰기는 회원전용입니다. 로그인 해주세요');
			return '/';
		}
	};

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				alert('로그아웃이 성공적으로 이루어졌습니다.');
				dispatch({ type: 'SET_MEMBERS', payload: null });
				navi('/');
			})
			.catch((error) => {
				// An error happened.
				alert('에러가 발생했습니다.');
			});
	};

	useEffect(()=>{
		if(toggle) {
			moGnb.current.style.right = 0;
		}else {
			moGnb.current.style.right = '-100%'
		}
	},[toggle])

	useEffect(() => {
		toggle
		? setGnb(`url(${path}/img/close2.png)`)
		: setGnb(`url(${path}/img/menu2.png)`);
	}, [toggle]);

	useEffect(() => {
		moGnb.current.style.right = '-100%';
		setToggle(false);
	}, [location]);
	return (
		<header>
			<div className='pc'>
				<ul>
					<li>
						<NavLink style={({ isActive }) => (isActive ? style : {})} to='/main'>
							인기영화
						</NavLink>
					</li>
					<li>
						<NavLink
							activestyle={style}
							to='/search'
							style={({ isActive }) => (isActive ? style : {})}>
							영화검색
						</NavLink>
					</li>
					<li>
						<NavLink
							activestyle={style}
							to='/list'
							style={({ isActive }) => (isActive ? style : {})}>
							메모리스트
						</NavLink>
					</li>
					<li>
						{members ? (
							<NavLink
								to='/write'
								style={({ isActive }) => (isActive ? style : {})}>
								글쓰기
							</NavLink>
						) : null}
					</li>
				</ul>

				<ul class='login'>
					<li>
						{!members ? (
							<NavLink
								to='/login'
								activestyle={style}
								style={({ isActive }) => (isActive ? style : {})}>
								<span><img src={`${path}/img/enter2.png`} alt=''/></span>로그인
							</NavLink>
						) : (
							<p onClick={handleLogout}>로그아웃</p>
						)}
					</li>
					<li>
						{!members ? (
							<NavLink
								to='/user'
								activestyle={style}
								style={({ isActive }) => (isActive ? style : {})}>
								<span><img src={`${path}/img/user2.png`} alt=''/></span>회원가입
							</NavLink>
						) : null}
					</li>
				</ul>
			</div>

			<div className="mobile">
				<p className='gnb-bar'  onClick={()=>setToggle(!toggle)} style={{ backgroundImage: gnb }}></p>
			</div>

			<div className='mobile-gnb' ref={moGnb}>
				<ul>
					<li>
						<NavLink style={({ isActive }) => (isActive ? style : {})} to='/main'>
							인기영화
						</NavLink>
					</li>
					<li>
						<NavLink
							activestyle={style}
							to='/search'
							style={({ isActive }) => (isActive ? style : {})}>
							영화검색
						</NavLink>
					</li>
					<li>
						<NavLink
							activestyle={style}
							to='/list'
							style={({ isActive }) => (isActive ? style : {})}>
							메모리스트
						</NavLink>
					</li>
					<li>
						{members ? (
							<NavLink
								to='/write'
								style={({ isActive }) => (isActive ? style : {})}>
								글쓰기
							</NavLink>
						) : null}
					</li>
				</ul>

				<ul class='login'>
					<li>
						{!members ? (
							<NavLink
								to='/login'
								activestyle={style}
								style={({ isActive }) => (isActive ? style : {})}>
								<span><img src={`${path}/img/enter2.png`} alt=''/></span>로그인
							</NavLink>
						) : (
							<p onClick={handleLogout}>로그아웃</p>
						)}
					</li>
					<li>
						{!members ? (
							<NavLink
								to='/user'
								activestyle={style}
								style={({ isActive }) => (isActive ? style : {})}>
								<span><img src={`${path}/img/user2.png`} alt=''/></span>회원가입
							</NavLink>
						) : null}
					</li>
				</ul>
			</div>

		</header>
	);
}

export default Header;
