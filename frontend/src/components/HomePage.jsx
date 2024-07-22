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
	Box,
} from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import UserFeed from './UserFeed';
import GenericFeed from './GenericFeed';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
	const { authUser, isLoggedIn, isLoading, error, isError } = useAuth();
	return (
		<Flex>
			<SubredditPanel />
			<Box width={['100%', '100%', '90%', '80%']}>
				<Outlet />
			</Box>
		</Flex>
	);
};

export default HomePage;
