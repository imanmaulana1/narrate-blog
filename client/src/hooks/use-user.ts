import { getUsers } from '@/services/api/userService';
import { UsersResponse } from '@/types/api/user';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  const { data, isLoading } = useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });

  return { data, isLoading };
};

export { useUsers };
