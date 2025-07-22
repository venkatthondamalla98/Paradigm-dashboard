import { useQuery } from '@tanstack/react-query';
import api from '../api/client';

export const useComms = (siteId, enabled = true) =>
  useQuery({
    queryKey: ['comms', siteId],
    queryFn: async () => (await api.get(`/comms/site/${siteId}`)).data,
    enabled,
  });
