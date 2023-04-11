import React from 'react';
import CardTitle from '../components/CardTitle';
import { Text, Divider, Input, Textarea, Button } from '@chakra-ui/react';
import UnauthenticatedState from '../components/UnauthenticatedState.js';
import { useAuth } from '../lib/auth';
import { FaPen } from 'react-icons/fa';
import useUser from '../hooks/queries/useUser.js';

const ProfileSettings = () => {
	const { user, isAuthenticated } = useAuth();
	const { data: userData } = useUser(user?._id, {
		enabled: isAuthenticated
	});

	return (
		<>
			{isAuthenticated ? (
				<>
					<CardTitle>Profile</CardTitle>
					<Divider mb={3} />
					<Text mb={1}>First name</Text>
					<Input
						type="text"
						name="first_name"
						placeholder="First name"
						value={userData?.first_name || ''}
						//onChange={handleInputChange}
						mb={3}
					/>
					<Text mb={1}>Last name</Text>
					<Input
						type="text"
						name="last_name"
						placeholder="Last name"
						value={userData?.last_name || ''}
						//onChange={handleInputChange}
						mb={3}
					/>
					<Text mb={1}>Bio</Text>
					<Textarea
						placeholder="Enter a bit about yourself"
						value={userData?.bio || ''}
						mb={3}
					/>
					<Button
						leftIcon={<FaPen />}
						// onClick={handleChangePassword}
						// isLoading={changePassword.isLoading}
						// loadingText="Changing Password..."
						// isDisabled={changePassword.isLoading || !validate()}
					>
						Update Profile
					</Button>
				</>
			) : (
				<UnauthenticatedState />
			)}
		</>
	);
};

export default ProfileSettings;
