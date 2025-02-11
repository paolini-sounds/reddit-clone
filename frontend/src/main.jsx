import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { defaultSystem } from '@chakra-ui/react';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (import.meta.env.MODE === 'production') {
	disableReactDevTools();
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<App />
					</AuthProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
