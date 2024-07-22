import { useQuery } from '@tanstack/react-query';
import UserAPI from '../services/UserAPI';

const useProfile = (name) => {
	const {
		data: userProfile,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserAPI.getUserProfile(name),
	});
	return { userProfile, isLoading, isError, error };
};
export default useProfile;
