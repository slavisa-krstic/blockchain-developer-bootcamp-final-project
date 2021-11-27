import React, { Suspense }  from 'react'
import { Switch, Route } from "react-router";
import { Router } from "react-router-dom";

import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core'

import { AppContextProvider } from './context/AppContext';

import history from "./core/history"

// Custom components
import Home from './pages/Home';
import Loading from "./pages/Loading";
import Layout from "./pages/Layout";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

export default function App () {
  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router history={history}>
          <Switch>
            <Suspense fallback={<Loading />}>
              <Layout>
                <Route exact path="/" component={Home} />
              </Layout>
            </Suspense>
          </Switch>
        </Router>
      </Web3ReactProvider>
    </AppContextProvider>
  )
};