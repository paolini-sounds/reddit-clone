import { createContext } from 'react';
import AuthAPI from '../services/AuthAPI';
import { useToast } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	const navigate = useNavigate();

	//query hook to fetch the user
	const {
		data: authUser,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['authUser'],
		queryFn: AuthAPI.getUser,
		staleTime: 1000 * 60 * 5,
		retry: false,
	});

	//mutation hook to login
	const loginMutation = useMutation({
		mutationFn: AuthAPI.login,
		onSuccess: () => {
			queryClient.invalidateQueries('authUser');
			toast({
				title: 'Logged in',
				description: 'You have successfully logged in',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/');
		},

		onError: (error) => {
			toast({
				title: 'An error occurred.',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	//mutation hook to logout
	const logoutMutation = useMutation({
		mutationFn: AuthAPI.logout,
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['authUser'] });
			toast({
				title: 'Logged out',
				description: 'You have successfully logged out',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/login');
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	//mutation hook to register
	const registerMutation = useMutation({
		mutationFn: AuthAPI.register,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['authUser'] });
			toast({
				title: 'Signed up',
				description: 'You have successfully signed up',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/dashboard');
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	const login = async (credentials) => {
		await loginMutation.mutateAsync(credentials);
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	const register = async (credentials) => {
		await registerMutation.mutateAsync(credentials);
	};

	const isLoggedIn = !!authUser;

	return (
		<AuthContext.Provider
			value={{
				authUser,
				isLoggedIn,
				isLoading,
				isError,
				error,
				login,
				logout,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
