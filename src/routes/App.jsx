import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppContext from '@context/AppContext';
import Home from '@containers/Home';
import Checkout from '@containers/Checkout';
import Layout from '@components/Layout';
import NotFound from '@containers/NotFound';
import useInitialState from '@hooks/useInitialState.js';

const App = () => {
  const initialState = useInitialState();
  const isEmpty = initialState.products.length;

  return (
    <>
      {isEmpty > 0 ? (
        <AppContext.Provider value={initialState}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AppContext.Provider>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default App;
