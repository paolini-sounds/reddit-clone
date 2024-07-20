import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Center, Spinner, useToast } from '@chakra-ui/react';

const ProtectedRoute = () => {
	const { authUser, isLoading } = useAuth();

	if (isLoading) {
		return (
			<Center h='100vh'>
				<Spinner size='xl' />
			</Center>
		);
	}
	const isLoggedIn = !!authUser;

	if (!isLoggedIn) {
		return (
			<Navigate
				to='/'
				state={{ message: 'You must be logged in to access that page' }}
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
