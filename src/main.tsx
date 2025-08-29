import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes/routes';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from 'flowbite-react';
import customTheme from './theme/customTheme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={customTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
