import api from './client';

export const fetchSites = async () => {
  console.log('[fetchSites] → GET /sites');
  const { data } = await api.get('/sites');
  console.log('[fetchSites] ←', data);
  return data;
};

export const fetchDashboardData = async (siteId) => {
  const [site, schematic, actions, risks, comms] = await Promise.all([
    api.get(`/sites/${siteId}`),
    api.get(`/schematic/site/${siteId}`),
    api.get(`/actions/site/${siteId}`),
    api.get(`/risks/site/${siteId}`),
    api.get(`/comms/site/${siteId}`),
  ]);
  return {
    site: site.data,
    schematic: schematic.data,
    actions: actions.data,
    risks: risks.data,
    comms: comms.data,
  };
};
