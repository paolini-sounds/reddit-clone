import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './components/ErrorPage';
import SubredditPage from './components/SubredditPage';
import useAuth from './hooks/useAuth';

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/:id' element={<ProfilePage />} />
				<Route path='/subreddits/:name' element={<SubredditPage />} />
				<Route path='/*' element={<ErrorPage />} />
			</Routes>
		</>
	);
}

export default App;
