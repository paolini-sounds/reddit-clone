import React from 'react';
import useProfile from '../hooks/useProfile';
import { Link, useParams } from 'react-router-dom';
import {
	Card,
	CardHeader,
	Center,
	Heading,
	Spinner,
	Flex,
	CardBody,
	Box,
	Wrap,
	WrapItem,
	Tag,
	TagLabel,
} from '@chakra-ui/react';

const ProfilePage = () => {
	const { username } = useParams();
	console.log('username', username);
	const { userProfile, isError, isLoading, error } = useProfile(username);

	if (isLoading) {
		return (
			<Center height='100dvh'>
				<Spinner size='xl' />
			</Center>
		);
	}
	console.log(userProfile);

	return (
		<Flex width='100%' justify='center' padding={10}>
			<Card width={['100%', '90%', '80%']}>
				<CardHeader>
					<Heading textAlign='center'>{userProfile.username}</Heading>
				</CardHeader>
				<CardBody>
					<Box mb={10}>
						<Heading size='lg'>Subscriptions</Heading>
						<Wrap spacing={5} margin={5}>
							{userProfile.subscriptions &&
							userProfile.subscriptions.length > 0 ? (
								userProfile.subscriptions.map((sub) => (
									<WrapItem key={sub._id}>
										<Tag
											as={Link}
											to={`/r/${sub.name}`}
											size='lg'
											variant='outline'
											colorScheme='blue'
										>
											<TagLabel>{sub.name}</TagLabel>
										</Tag>
									</WrapItem>
								))
							) : (
								<Heading size='sm'>No subscriptions</Heading>
							)}
						</Wrap>
					</Box>
					<Box>
						<Heading size='lg'>Upvotes</Heading>
						<Box margin={5}>
							<Heading size='sm'>{userProfile.totalUpvotes}</Heading>
						</Box>
					</Box>
				</CardBody>
			</Card>
		</Flex>
	);
};

export default ProfilePage;
