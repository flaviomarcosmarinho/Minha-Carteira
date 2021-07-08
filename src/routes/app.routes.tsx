// Criando as rotas
//https://www.npmjs.com/package/react-router-dom
//Precisa instalar com yarn add react-router-dom e instalar também yarn add @types/react-router-dom -D

import React from "react";
import { Switch, Route } from 'react-router-dom';

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/list/:type" exact component={List} />
        </Switch>
    </Layout>
);

export default AppRoutes;