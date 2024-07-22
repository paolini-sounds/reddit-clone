import React from 'react';
import SubredditPanel from './SubredditPanel';
import { Flex, Box } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
	const { authUser, isLoggedIn, isLoading, error, isError } = useAuth();
	return (
		<Flex>
			<SubredditPanel />
			<Box
				mt={16}
				ml={[0, 0, 0, '250px']}
				width={['100%', '100%', '90%', '80%']}
			>
				<Outlet />
			</Box>
		</Flex>
	);
};

export default HomePage;
