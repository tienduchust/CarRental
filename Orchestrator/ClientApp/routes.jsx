import AuthorizedLayout from '@Layouts/AuthorizedLayout';
import GuestLayout from "@Layouts/GuestLayout";
import LoginPage from '@Pages/LoginPage';
import AppRoute from "@Components/shared/AppRoute";
import * as React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from '@Pages/HomePage';
import ExecutorPage from '@Pages/ExecutorPage';
import OrchestratorPage from '@Pages/OrchestratorPage';

export const routes = <Switch>
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/" component={HomePage} />
    <AppRoute layout={AuthorizedLayout} exact path="/executor" component={ExecutorPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/orchestrator" component={OrchestratorPage} />
</Switch>;