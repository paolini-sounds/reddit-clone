import {
	Menu,
	MenuButton,
	Button,
	MenuList,
	MenuItem,
	Avatar,
	useColorMode,
	Center,
	MenuDivider,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AccountMenu = () => {
	const { authUser, logout } = useAuth();
	const { colorMode } = useColorMode();
	const navigate = useNavigate();

	const isLoggedIn = authUser ? true : false;

	return (
		<Menu>
			<MenuButton
				as={Button}
				variant={colorMode === 'dark' ? 'ghost' : 'solid'}
				rounded={'full'}
				cursor={'pointer'}
				minW={0}
			>
				<Avatar size='sm' name={isLoggedIn ? authUser.username : ''} />
			</MenuButton>
			<MenuList alignItems={'center'}>
				<React.Fragment>
					{isLoggedIn && (
						<React.Fragment>
							<br />
							<Center>
								<Link to={`/u/${isLoggedIn ? authUser.username : ''}`}>
									<Avatar
										size='md'
										name={isLoggedIn ? authUser.username : ''}
									/>
								</Link>
							</Center>
							<br />
							<Center>
								<p>{isLoggedIn ? authUser.username : ''}</p>
							</Center>
							<br />
							<MenuDivider />
						</React.Fragment>
					)}
					<MenuItem
						fontWeight='normal'
						textAlign='left'
						onClick={isLoggedIn ? logout : () => navigate('/login')}
					>
						{isLoggedIn ? 'Logout' : 'Login/Signup'}
					</MenuItem>
				</React.Fragment>
			</MenuList>
		</Menu>
	);
};

export default AccountMenu;
