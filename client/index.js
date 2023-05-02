// import './index.css';
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";
import { store } from './store';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>, document.getElementById('app')
);
