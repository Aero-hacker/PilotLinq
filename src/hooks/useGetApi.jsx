import { useQuery } from "@tanstack/react-query";

const useGetApi = (apiDefinition) => {
  const { data, isLoading, isPending, isError, error, refetch } = useQuery({
    queryKey: apiDefinition.queryKey,
    queryFn: apiDefinition.queryFn,
  });

  if (isError) {
    console.log(error);
  }

  return { data, isLoading, isPending, isError, error, refetch };
};

export default useGetApi;
