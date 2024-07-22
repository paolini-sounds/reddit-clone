import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import useAuthForm from '../hooks/useAuthForm';

const SignupForm = () => {
	const { handleSubmit, errors, hasFormErrors, handleInputChange } =
		useAuthForm('signup');

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

					<FormControl isInvalid={errors.username}>
						<FormLabel mt={5}>Username</FormLabel>
						<Input type='text' name='username' onChange={handleInputChange} />
						{errors.username && (
							<FormErrorMessage>Username Required</FormErrorMessage>
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
							<FormErrorMessage>
								Enter a password of at least 6 characters.
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.confirmpassword}>
						<FormLabel mt={5}>Confirm Password</FormLabel>
						<Input
							type='password'
							name='confirmpassword'
							onChange={handleInputChange}
						/>
						{errors.confirmpassword && (
							<FormErrorMessage>Passwords must match</FormErrorMessage>
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
						Signup
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default SignupForm;
