import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Transactions } from './pages/Transactions';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { Toaster } from 'sonner';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
      <GlobalStyle />
      <Toaster richColors closeButton position='top-right' />
    </ThemeProvider>
  );
}
