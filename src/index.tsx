import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme'
import { AuthProvider } from './hooks/auth'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider> {/*App tem que ficar envolvido por ThemeProvider para que o thema seja acessado por toda aplicação*/}
      < AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);