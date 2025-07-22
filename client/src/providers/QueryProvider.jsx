import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const client = new QueryClient();
export default ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
