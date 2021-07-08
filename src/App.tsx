import React from "react";
import { ThemeProvider } from "styled-components";
import GlobaStyles from "./styles/GlobaStyles";

import Routes from './routes';

import dark from './styles/themes/dark'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobaStyles />
            <Routes />
        </ThemeProvider>
    );
}

export default App;