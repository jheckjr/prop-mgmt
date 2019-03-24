import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/applied-route.js';
import AuthenticatedRoute from './components/authenticated-route.js';
import UnauthenticatedRoute from './components/unauthenticated-route.js';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import NewTransactionPage from './pages/new-transaction';
import TransactionsPage from './pages/transactions';
import TransactionPage from './pages/note';
import NotFoundPage from './pages/not-found';
import SignupPage from './pages/signup';

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={HomePage} props={childProps} />
      <UnauthenticatedRoute path="/login" exact component={LoginPage} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={childProps} />
      <UnauthenticatedRoute path="/transactions/new" exact component={NewTransactionPage} props={childProps} />
      <UnauthenticatedRoute path="/transactions/:id" exact component={TransactionPage} props={childProps} />
      <UnauthenticatedRoute path="/transactions" exact component={TransactionsPage} props={childProps} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
