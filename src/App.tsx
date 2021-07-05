import React from "react";
import { ThemeProvider } from 'styled-components';
import GlobaStyles from "./styles/GlobaStyles";

import Layout from "./components/Layout";
import dark from './styles/themes/dark'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobaStyles />
            <Layout />
        </ThemeProvider>
    );
}

export default App;