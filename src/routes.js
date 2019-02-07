import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/applied-route.js';
import AuthenticatedRoute from './components/authenticated-route.js';
import UnauthenticatedRoute from './components/unauthenticated-route.js';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import NewNotePage from './pages/new-note';
import NotePage from './pages/note';
import NotFoundPage from './pages/not-found';
import SignupPage from './pages/signup';

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={HomePage} props={childProps} />
      <UnauthenticatedRoute path="/login" exact component={LoginPage} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={childProps} />
      <AuthenticatedRoute path="/notes/new" exact component={NewNotePage} props={childProps} />
      <AuthenticatedRoute path="/notes/:id" exact component={NotePage} props={childProps} />
      <Route component={NotFoundPage} />
    </Switch>
  ); 
}
