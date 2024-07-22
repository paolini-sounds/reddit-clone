import express from 'express';
import {
	createSubreddit,
	deleteSubreddit,
	getAllSubreddits,
	getSubbreddit,
	subscribeUnsubScribeSubreddit,
	updateSubreddit,
	seedSubreddits,
} from '../controllers/subredditController.js';
import {
	createPost,
	getPost,
	updatePost,
	deletePost,
	upvotePost,
	getGenericFeed,
} from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';
import { validateSubreddit } from '../middleware/subredditValidator.js';
import { validatePost } from '../middleware/postValidator.js';
import { commentValidator } from '../middleware/commentValidator.js';
import {
	createComment,
	getComment,
	getAllComments,
	updateComment,
	deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getAllSubreddits); //get all subreddits
router.get('/seeddb', seedSubreddits);
router.post('/create', protectRoute, validateSubreddit, createSubreddit); //create subreddit
router.get('/feed', getGenericFeed); //get generic feed
router.get('/:name', getSubbreddit); //get subreddit by name
router.post('/:name', protectRoute, subscribeUnsubScribeSubreddit); //subscribe to subreddit
router.put('/:id', protectRoute, validateSubreddit, updateSubreddit); //update subreddit
router.delete('/:id', protectRoute, deleteSubreddit); //delete subreddit

//post routes
router.post('/:name/posts', protectRoute, validatePost, createPost); //create post in subreddit
router.post('/:name/posts/:id/upvote', protectRoute, upvotePost); //upvote post in subreddit by id
router.get('/:name/posts/:id', getPost); //update post in subreddit by id
router.put('/:name/posts/:id', protectRoute, validatePost, updatePost); //update post in subreddit by id
router.delete('/:name/posts/:id', protectRoute, deletePost); //delete post in subreddit by id

//comment routes
router.get('/:name/posts/:id/comments', getAllComments); //get all comments in post
router.post(
	'/:name/posts/:id/comments',
	protectRoute,
	commentValidator,
	createComment
); //create comment in post
router.get('/:name/posts/:id/comments/:commentId', getComment); //get comment in post by id
router.put(
	'/:name/posts/:id/comments/:commentId',
	protectRoute,
	commentValidator,
	updateComment
); //update comment in post by id
router.delete(
	'/:name/posts/:id/comments/:commentId',
	protectRoute,
	deleteComment
); //delete comment in post by id

export default router;
