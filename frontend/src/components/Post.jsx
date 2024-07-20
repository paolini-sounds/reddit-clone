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
import usePost from '../hooks/usePost';
import useAuth from '../hooks/useAuth';

const Post = ({ post, subredditName }) => {
	const { upvote } = usePost();
	const { authUser } = useAuth();

	const isUpvoted = authUser.upvotedPosts.includes(post._id);

	console.log('post: ', post);
	return (
		<Card width='100%'>
			<CardHeader fontWeight='bold'>
				<Button variant='link' as={Link} to={`/r/${subredditName}`}>
					r/{subredditName}
				</Button>
				<Heading>{post.title}</Heading>
				<Button
					size='sm'
					variant='link'
					as={Link}
					to={`/u/${post.author.username}`}
				>
					u/{post.author.username}
				</Button>
			</CardHeader>

			<CardBody>
				<Text>{post.content}</Text>
			</CardBody>
			<CardFooter>
				<Button
					leftIcon={<TbArrowBigUp />}
					onClick={() => upvote({ subredditName, postId: post._id })}
					colorScheme={isUpvoted ? 'green' : 'gray'}
				>
					{post.upvotes}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Post;
