import { Routes, Route } from 'react-router-dom';
import Write from './components/board/Write';
import List from './components/board/List';
import Header from './components/common/Header';
import Detail from './components/board/Detail';
import Edit from './components/board/Edit';
import Main from './components/movie/Main';
import Search from './components/movie/Search';
import Login from './components/login/Login';
import User from './components/login/User';
import MovieDetail from './components/movie/MovieDetail';
import Footer from './components/common/Footer';

import './components/scss/layout.scss';
import './components/scss/main.scss';
import './components/scss/style.scss';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/Main' element={<Main />} />
				<Route path='/List' element={<List />} />
				<Route path='/write' location={{ name: 'Jua' }} element={<Write />} />
				<Route path='/List/:num' element={<Detail />} />
				<Route path='/Edit/:num' element={<Edit />} />
				<Route path='/search' element={<Search />} />
				<Route path='/login' element={<Login />} />
				<Route path='/user' element={<User />} />
				<Route path='/MovieDetail/:movieId' element={<MovieDetail />} />
			</Routes>
			<Footer/>
		</>
	);
}

export default App;
