import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './components/ErrorPage';
import SubredditPage from './components/SubredditPage';
import CreatePostForm from './components/CreatePostForm';

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />}>
					<Route path='/u/:username' element={<ProfilePage />} />
					<Route path='/r/:name' element={<SubredditPage />} />
					<Route element={<ProtectedRoute />}>
						<Route path='r/:name/create' element={<CreatePostForm />} />
					</Route>
					<Route path='/*' element={<ErrorPage />} />
				</Route>
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
