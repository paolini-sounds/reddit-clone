import React from 'react';
import SubredditPanel from './SubredditPanel';
import {
	Center,
	Flex,
	Grid,
	GridItem,
	SimpleGrid,
	Spinner,
	Text,
} from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import UserFeed from './UserFeed';
import GenericFeed from './GenericFeed';

const HomePage = () => {
	const { authUser, isLoggedIn, isLoading, error, isError } = useAuth();
	return (
		<Flex>
			<SubredditPanel />
			{isLoading ? (
				<Center h='100vh'>
					<Spinner size='xl' />
				</Center>
			) : isLoggedIn ? (
				<UserFeed />
			) : (
				<GenericFeed />
			)}
		</Flex>
	);
};

export default HomePage;
