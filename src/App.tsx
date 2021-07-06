import React from "react";
import { ThemeProvider } from 'styled-components';
import GlobaStyles from "./styles/GlobaStyles";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import dark from './styles/themes/dark'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobaStyles />
            <Layout>
                <Dashboard />
            </Layout>
        </ThemeProvider>
    );
}

export default App;