import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
	const navi = useNavigate();
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [error, setError] = useState({});
	const auth = getAuth();
	const dispatch = useDispatch();
	const [catchErr, setCatchErr] = useState(null);
	const [show, setShow] = useState(false);

	const path = process.env.PUBLIC_URL;

	const handleLogin = (e) => {
		e.preventDefault();
		setShow(true);

		const err = {};
		e.preventDefault();
		var regEmail =
			/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

		if (!id.length || !regEmail.test(id)) {
			err.id = 'Error (auth/invalid-email).';
		}

		if (pw.length < 6) {
			err.pw = 'Password should be at least 6 characters';
		}
		return setError(err);
	};

	useEffect(() => {
		if (show && Object.keys(error).length === 0) {
			signInWithEmailAndPassword(auth, id, pw)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					alert('로그인에 성공했습니다');
					console.log(user.auth.currentUser.uid);
					dispatch({ type: 'SET_MEMBERS', payload: user.auth.currentUser.uid });
					navi('/');
					// ...
				})
				.catch((error) => {
					console.log(error);
					const errorCode = error.code;
					const errorMessage = error.message;
					setCatchErr('Error (auth/user-not-found).');
					// console.log(catchErr);
				});
		}
	}, [error]);

	return (
		<Layout>
			<h2 className='user-title'>
				<img src={`${path}/img/enter.png`} alt='' />
				로그인
			</h2>
			<p style={{ paddingBottom: '10px' }}>
				로그인 하시면 게시판 기능을 이용하실 수 있습니다.
			</p>
			<div className='page'>
				<div className='container'>
					<div class='left'>
						<div class='login'>Login</div>
						<div class='eula'>
							By logging in you agree to the long terms that you didn't bother
							to read
						</div>
					</div>
					<div class='right'>
						<form className='form' onSubmit={handleLogin}>
							<div>
								<label htmlFor='id'>이메일</label>
								<div className='input-wrap'>
									<input
										type='text'
										id='id'
										value={id}
										onChange={(e) => setId(e.target.value)}
									/>
								</div>
								<p>{error.id ? error.id : null}</p>
							</div>
							<div>
								<label htmlFor='pw'>비밀번호</label>
								<div>
									<input
										type='password'
										id='pw'
										value={pw}
										onChange={(e) => setPw(e.target.value)}
									/>
								</div>
								<p>{error.pw ? error.pw : null}</p>
								<p>{catchErr && catchErr}</p>
							</div>
							<div>
								<input type='submit' id='submit' value='제출' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Login;
