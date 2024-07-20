import { Center, Heading, Text, Stack } from '@chakra-ui/react';

const ErrorPage = () => {
	return (
		<Center margin={10}>
			<Stack>
				<Heading textAlign='center'>Oops</Heading>
				<Text>We couldn't find that page.</Text>
			</Stack>
		</Center>
	);
};

export default ErrorPage;
