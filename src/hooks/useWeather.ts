import { useQuery } from '@tanstack/react-query';
import { getWeather } from '@/lib/api/getWeather';

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city),
    enabled: !!city,
  });
};
