import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navi = useNavigate();
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [error, setError] = useState({});
	const [validate, setValidate] = useState(false);

	const path = process.env.PUBLIC_URL;
	const handleLogin = (e) => {
		e.preventDefault();
		setValidate(true);
		const err = {};
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
		if (Object.keys(error).length === 0 && validate) {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, id, pw)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					// ...
					alert('회원가입이 성공했습니다');
					setValidate(false);
					navi('/login');
				})
				.catch((error) => {
					alert('회원가입이 실패했습니다. 아이디 비밀번호를 확인해주세요');
					setValidate(false);
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
				});
		}
	}, [error]);
	return (
		<Layout>
			<h2 className='user-title'>
				<img src={`${path}/img/user.png`} alt=''></img>회원가입
			</h2>
			<p style={{ paddingBottom: '30px' }}>
				회원가입을 하시면 게시판의 모든 기능을 이용하실 수 있습니다.
			</p>
			<div className='join-wrap'>
				<div className='left'>
				<form onSubmit={handleLogin}>
						<div>
							<label htmlFor='id'>이메일</label>
							<input
								type='text'
								id='id'
								value={id}
								onChange={(e) => setId(e.target.value)}
							/>
							<p>{error.id ? error.id : null}</p>
						</div>
						<div>
							<label htmlFor='pw'>비밀번호</label>
							<input
								type='password'
								id='pw'
								value={pw}
								onChange={(e) => setPw(e.target.value)}
							/>
							<p>{error.pw ? error.pw : null}</p>
						</div>
						<div>
							<input type='submit' value='가입하기' />
						</div>
					</form>
				</div>
				<div className="right">
					<div className='right-text'>
						<h3>Join</h3>
						<p class='left-detail'>
							By logging in you agree to the long terms that you didn't bother
							to read
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Login;
