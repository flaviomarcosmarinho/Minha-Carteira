import React from "react";
import { ThemeProvider } from "styled-components";
import GlobaStyles from "./styles/GlobaStyles";

import { useTheme } from './hooks/theme';

import Routes from './routes';

const App: React.FC = () => {
    const {theme} = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <GlobaStyles />
            <Routes />
        </ThemeProvider>
    );
}

export default App;