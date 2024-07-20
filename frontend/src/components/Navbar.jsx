import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	Stack,
	useColorMode,
	useColorModeValue,
	useMediaQuery,
	Heading,
	LinkOverlay,
} from '@chakra-ui/react';
import { FaRegMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

import AccountMenu from './AccountMenu';
import useAuth from '../hooks/useAuth';
import React from 'react';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} pl={4}>
			<Flex
				h={16}
				alignItems='center'
				justifyContent='space-between'
				width='100%'
			>
				<Box>
					<Button variant='link' as={Link} to='/'>
						<Heading size='md'>Not Reddit</Heading>
					</Button>
				</Box>
				<HStack ml='auto'>
					<Button
						variant={colorMode === 'dark' ? 'ghost' : 'solid'}
						onClick={toggleColorMode}
					>
						{colorMode === 'light' ? <FaRegMoon /> : <MdOutlineWbSunny />}
					</Button>

					<AccountMenu />
				</HStack>
			</Flex>
		</Box>
	);
};

export default Navbar;
