import useAuth from '../hooks/useAuth';
import UserFeed from './UserFeed';
import GenericFeed from './GenericFeed';

const Feed = () => {
	const { authUser, isLoggedIn, isLoading, error, isError } = useAuth();
	return (
		<>
			{isLoading ? (
				<Center h='100vh'>
					<Spinner size='xl' />
				</Center>
			) : isLoggedIn ? (
				<UserFeed />
			) : (
				<GenericFeed />
			)}
		</>
	);
};

export default Feed;
