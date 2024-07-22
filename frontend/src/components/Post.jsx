import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Text,
	Button,
	Heading,
	Spinner,
	useToast,
	Divider,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBigUp } from 'react-icons/tb';
import usePost from '../hooks/usePost';
import useAuth from '../hooks/useAuth';
import CreateCommentForm from './CreateCommentForm';
import { FaRegEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import Comment from './Comment';
import { formatDistanceToNow } from 'date-fns';
import useComment from '../hooks/useComment';

const Post = ({ post, subredditName }) => {
	const navigate = useNavigate();
	const [openCreateComment, setOpenCreateComment] = React.useState(false);
	const toast = useToast();
	const {
		upvote,
		deletePost,
		comments,
		isLoading,
		isError,
		error,
		upvoteMutation,
		enableComments,
		setEnableComments,
	} = usePost(subredditName, post._id);
	const { authUser, isLoggedIn, isLoading: authUserLoading } = useAuth();
	const { deleteComment } = useComment(subredditName, post._id);

	if (authUserLoading) {
		return <Spinner />;
	}
	const isAuthor = authUser._id === post.author._id;

	const handleUpvoteClick = () => {
		console.log('postId:', post._id);
		if (isLoggedIn) {
			upvote();
		} else {
			toast({
				title: 'You must be logged in to upvote',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const isUpvoted = authUser.upvotedPosts.includes(post._id);
	const isCommentor = (id) => authUser._id === id;
	return (
		<Card>
			<CardHeader fontWeight='bold'>
				<Flex justify='space-between'>
					<Button variant='link' as={Link} to={`/r/${subredditName}`}>
						r/{subredditName}
					</Button>
					{isAuthor && (
						<HStack spacing={2}>
							<IconButton
								size='sm'
								variant='ghost'
								onClick={() =>
									navigate(`/r/${subredditName}/create`, {
										state: { post: post, isEditMode: true },
									})
								}
								icon={<FaRegEdit />}
							/>
							<IconButton
								size='sm'
								variant='ghost'
								colorScheme='red'
								onClick={deletePost}
								icon={<FaDeleteLeft />}
							/>
						</HStack>
					)}
				</Flex>
				<Heading size='md'>{post.title}</Heading>
				<Button
					size='xs'
					variant='link'
					as={Link}
					to={`/u/${post.author.username}`}
				>
					u/{post.author.username}
				</Button>
				<Text fontWeight='normal' fontSize='xs'>{`${formatDistanceToNow(
					new Date(post.createdAt)
				)} ago`}</Text>
			</CardHeader>

			<CardBody paddingX={10}>
				<Text>{post.content}</Text>
			</CardBody>

			<CardFooter>
				<Flex
					paddingX={[0, 4, 5, 6, 10]}
					width='100%'
					justifyContent='space-between'
					direction={['column', 'row']}
					gap={5}
				>
					{upvoteMutation.isPending ? (
						<Button maxWidth='75px' size='sm'>
							<Spinner />
						</Button>
					) : (
						<Button
							size='sm'
							alignSelf='center'
							maxWidth='75px'
							leftIcon={<TbArrowBigUp />}
							onClick={handleUpvoteClick}
							colorScheme={isUpvoted ? 'green' : 'gray'}
						>
							{post.upvotes}
						</Button>
					)}
					{post.comments && (
						<Button
							size='sm'
							variant='link'
							onClick={() => setEnableComments(!enableComments)}
						>
							{enableComments ? 'Hide Comments ' : 'Show Comments '}(
							{post.comments.length})
						</Button>
					)}
					<Button
						variant='link'
						size='sm'
						onClick={() => setOpenCreateComment(!openCreateComment)}
					>
						Create Comment
					</Button>
				</Flex>
			</CardFooter>
			{openCreateComment && (
				<CreateCommentForm
					post={post}
					subredditName={subredditName}
					callback={() => {
						setOpenCreateComment(false);
						setEnableComments(true);
					}}
				/>
			)}
			{enableComments && (
				<React.Fragment>
					<Divider alignSelf='center' width='90%' color='gray.400' />
					<CardFooter>
						<Flex width='100%' direction='column' gap={5}>
							<Heading size='sm'>Comments</Heading>

							<Flex direction='column' width='100%' padding={5}>
								{isLoading ? (
									<Spinner />
								) : isError ? (
									<Heading>{error.message}</Heading>
								) : comments.length === 0 ? (
									<Text>No comments here yet</Text>
								) : (
									comments?.map((comment) => (
										<Comment
											comment={comment}
											key={comment._id}
											isCommentor={isCommentor(comment.user._id)}
											handleDelete={() => deleteComment(comment._id)}
										/>
									))
								)}
							</Flex>
						</Flex>
					</CardFooter>
				</React.Fragment>
			)}
		</Card>
	);
};

export default Post;
