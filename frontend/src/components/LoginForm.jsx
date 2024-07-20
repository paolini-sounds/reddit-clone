import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
} from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import useAuthForm from '../hooks/useAuthForm';

const LoginForm = () => {
	const { login } = useAuth();
	const { isTyping, handleSubmit, errors, hasFormErrors, handleInputChange } =
		useAuthForm('login');

	return (
		<Flex direction='column' alignItems='center'>
			<form onSubmit={handleSubmit}>
				<Flex direction='column' width='300px' paddingY={5} margin='auto'>
					<FormControl isInvalid={errors.email}>
						<FormLabel mt={5}>Email address</FormLabel>
						<Input type='email' name='email' onChange={handleInputChange} />
						{errors.email && (
							<FormErrorMessage>Valid Email Required</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.password}>
						<FormLabel mt={5}>Password</FormLabel>
						<Input
							type='password'
							name='password'
							onChange={handleInputChange}
						/>
						{errors.password && (
							<FormErrorMessage>Invalid password.</FormErrorMessage>
						)}
					</FormControl>

					<Button
						isDisabled={hasFormErrors}
						mt={7}
						type='submit'
						width={'100px'}
						value='submit'
						variant='solid'
						marginX='auto'
					>
						Login
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default LoginForm;
