import {
	Flex,
	Heading,
	Divider,
	VStack,
	StackDivider,
	AbsoluteCenter,
	useToast,
} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
	const toast = useToast();
	const location = useLocation();

	useEffect(() => {
		if (location.state?.message) {
			toast({
				title: 'Protected Route',
				description: location.state.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	}, [location, toast]);

	return (
		<Flex
			direction='column'
			alignItems='center'
			height={['auto', 'auto', '65dvh']}
		>
			<Heading my={5}>Not Reddit</Heading>
			<Flex gap={[1, 1, 5]} direction={['column', 'column', 'row']}>
				<VStack>
					<Heading size='lg'>Login</Heading>
					<LoginForm />
				</VStack>
				<Divider orientation='vertical' />
				<VStack>
					<Heading size='lg'>Signup</Heading>
					<SignupForm />
				</VStack>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
