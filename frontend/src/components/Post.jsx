import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Text,
	Button,
	Heading,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowBigUp } from 'react-icons/tb';

const Post = ({ post, subredditName }) => {
	return (
		<Card width='100%'>
			<CardHeader fontWeight='bold'>
				<Button variant='link' as={Link} to={`/subreddits/${subredditName}`}>
					r/{subredditName}
				</Button>
				<Heading>{post.title}</Heading>
				<Button
					size='sm'
					variant='link'
					as={Link}
					to={`/${post.author.username}`}
				>
					u/{post.author.username}
				</Button>
			</CardHeader>

			<CardBody>
				<Text>{post.content}</Text>
			</CardBody>
			<CardFooter>
				<Button leftIcon={<TbArrowBigUp />}>{post.upvotes}</Button>
			</CardFooter>
		</Card>
	);
};

export default Post;
